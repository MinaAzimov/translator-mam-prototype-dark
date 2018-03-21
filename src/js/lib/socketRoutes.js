import { 
  addChat, 
  userLogin, 
  userLogout, 
  captureField, 
  releaseField, 
  updateField,
  addTask,
  captureRTEditorBlock,
  releaseRTEditorBlock,
  updateBlock,
  insertBlockAfter,
  revertContent,
  lockContent,
  unlockContent,
  addMedia,
  finishUpload,
  publishContent,
  updateMedia,
  userDisconnects
} from "../actions";

import { SLACK_WEBHOOK_URL } from '../constants'
import { staticUrl, siteUrl } from './utils';
import { getTaskTypeData } from '../services/tasks';
import Slack from 'node-slackr';
import { getUserData } from '../services/users';
import { debounce, uniq, union } from "lodash";
//let slack = new Slack(SLACK_WEBHOOK_URL);

let slack = new Slack(SLACK_WEBHOOK_URL,{
  channel: "#hotseat",
  username: "atlantis-bot",
  icon_url: staticUrl("/img/avatar/cnbc-slackbot.png")
});

let mediaItemIds = 1000;


let userLogoutTimeouts = [];

export default function socketRoutes(socket, applyUpdate, store) {

  let handshakeData = socket.request;
  let sessionId = handshakeData._query['sessionId'];
  let users = store.getState().users;
  let thisUser = users.find(user => user.sessionId === sessionId);

  if (thisUser) {
    clearTimeout(userLogoutTimeouts[thisUser.id]);
    let action = userLogin(thisUser.id, sessionId, socket.id);
    applyUpdate(action);
  }

  // Client disconnects
  socket.on('disconnect', function() {
    // Find a user associated with this socket, and remove it
    let users = store.getState().users;
    let thisUser = users.find(user => user.socketId === socket.id);
    if (thisUser) {
      let t = setTimeout(() => {
        let action = userLogout(thisUser.id);
        applyUpdate(action);
      }, 5000);
      userLogoutTimeouts[thisUser.id] = t;
    }


  });


  // -------  Chat -------

  socket.on('CHAT_MSG', function(msg, userId) {
  	let action = addChat(msg, userId, Date.now());
  	applyUpdate(action);
  });


  // -------  Login/Logout -------

  socket.on('LOGIN', function(userId, sid) {
  	let action = userLogin(userId, sid, socket.id);
  	applyUpdate(action);
    // Synchronise client store with the server, as well as send back
    // the current user data
    let users = store.getState().users;
    let userData = users.find((user) => user.id === parseInt(userId));
    socket.emit('LOGIN_SUCCESS', userData);
  });

  socket.on('LOGOUT', function(userId, sid) {
    let action = userLogout(userId, sid);
    applyUpdate(action);
    socket.emit('LOGOUT_SUCCESS');
  });


  // ------- Fields -------

  socket.on('FIELD_FOCUS', function(userId, fieldId){
    let action = captureField(userId, fieldId);
    applyUpdate(action);     
  });

  socket.on('FIELD_BLUR', function(fieldId){
    let action = releaseField(fieldId);
    applyUpdate(action);     
  });

  function releaseFieldWrapper (fieldId) {
    let action = releaseField(fieldId, userId);
    applyUpdate(action);
  }

  // This object stores timeouts for a function that will release
  // all the users blocks.
  // This is so we can release the blocks after a timeout of no activity
  let releaseFieldTimeouts = {}


  function runUpdateFieldActions(actions) {

    actions.forEach(action => {

      let fieldId = action.fieldId;

      if (releaseFieldTimeouts[fieldId]) {
        clearTimeout(releaseFieldTimeouts[fieldId]);
      }

      releaseFieldTimeouts[fieldId] = setTimeout(()=> {
        let releaseAction = releaseField(fieldId);
        applyUpdate(releaseAction);
        releaseBlockTimeouts[fieldId] = null;
      }, 10000);


      applyUpdate(action); 

    })
  }


  socket.on('FIELD_CHANGE', function(userId, fieldId, value){

    // Check if there are any field propagations needed
    let fields = store.getState().fields;
    let field = fields.find(field=> field.id === fieldId);
    let actions = [];

    if (field.autoPropagateTo) {
      field.autoPropagateTo.forEach(i => {
        let propagatedField = fields.find(f=> f.id === i);
        // Only propagate if the values are the same
        if (propagatedField && !propagatedField.touched) {
          actions.push(updateField(userId, i, value, false));
        }
      })
    }

    // Special case for the permalink field
    if (field.id === 0) {
      let propagatedField = fields.find(f=> f.id === 38);
      if (propagatedField && !propagatedField.touched) {
        let slugified = value.trim().replace(/\s+/g, '-').toLowerCase();
        actions.push(updateField(userId, 38, slugified, false));
      }
    }

    // Special case for the primary tags field
    if (field.id === 12) {
      // Get keywords field
      let propagatedField = fields.find(f=> f.id === 10);
      if (propagatedField && !propagatedField.touched) {
        let currKeywords = propagatedField.value;
        let newKeywords = value.map(item=> {
          return item.value ? item.value.title : null;
        });

        let result = union(currKeywords, newKeywords);
        actions.push(updateField(userId, 10, result, false));
      }
    }

    actions.push(updateField(userId, fieldId, value));
    runUpdateFieldActions(actions);
    // We need to show/hide user statuses
  });

  socket.on('REVERT_CONTENT', function() {
    let action = revertContent();
    applyUpdate(action);
  })

  socket.on('LOCK_CONTENT', function(userId) {
    let action = (userId !== undefined ? lockContent(userId) : unlockContent());
    applyUpdate(action);
  })

  socket.on('PUBLISH_CONTENT', function() {
    let action = publishContent();
    applyUpdate(action);

    let title = store.getState().fields[0].value;

    slack.notify("Article <http://www.cnbc.com/|'" + title + "'> was just published.\n<http://localhost:8000/edit | View on Atlantis>", function(err, result){
         console.log(err,result);
    });


  })

  // ------- Collaborative editor -------

  socket.on('RTEDITOR_MAKE_BLOCK', function(userId, fieldId, blockIndex) {
    let fields = store.getState().fields;
    let field = fields.find(field => field.id === fieldId);
    if (field.blocks === undefined) {
      return;
    }
    let block = field.blocks[blockIndex];
    let lastId = Math.max.apply(Math, field.blocks.map(function(o){
      if (o.blockId !== undefined)
        return o.blockId;
      return 0;
    }));
    if (typeof block === "string") {
      let newBlock = {
        editorUserId: userId,
        html: block,
        blockId: lastId + 1
      }
      let action = captureRTEditorBlock(fieldId, blockIndex, newBlock);
      applyUpdate(action);
     }
  });


  socket.on('RTEDITOR_START_EDIT', function(userId, fieldId, blockId) {
    let action = captureRTEditorBlock(userId, fieldId, blockId);
    applyUpdate(action);
  });

  socket.on('RTEDITOR_STOP_EDIT', function(fieldId, blockId) {
    let action = releaseRTEditorBlock(fieldId, blockId);
    applyUpdate(action);
  });


  function releaseBlock (fieldId, userId) {
    let action = releaseRTEditorBlock(fieldId, userId);
    applyUpdate(action);
  }

  // This object stores timeouts for a function that will release
  // all the users blocks.
  // This is so we can release the blocks after a timeout of no activity
  let releaseBlockTimeouts = {}

  socket.on('RTEDITOR_CHANGE', function(fieldId, userId, contentState) {
    let action = updateBlock(fieldId, userId, contentState);
    applyUpdate(action);

    if (releaseBlockTimeouts[userId]) {
      clearTimeout(releaseBlockTimeouts[userId]);
    }

    releaseBlockTimeouts[userId] = setTimeout(()=> {
      let action = releaseRTEditorBlock(fieldId, userId);
      applyUpdate(action);
      releaseBlockTimeouts[userId] = null;
    }, 2000);

  });

  socket.on('RTEDITOR_INSERT_AFTER', function(userId, fieldId, blockId, html = '') {
    let field = store.getState().fields.find(field => field.id === fieldId);
    if (field.blocks === undefined) {
      return;
    }
    let lastId = Math.max.apply(Math, field.blocks.map(function(o){
      if (o.blockId !== undefined)
        return o.blockId;
      return 0;
    }));
    let action = insertBlockAfter(userId, fieldId, blockId, lastId+1, html);
    applyUpdate(action);
  })



   // ------- Tasks -------

  socket.on('ADD_TASK', function(userId, actionId, priority, assignedByUserId, memo, associatedContentId) {
    let timestamp = Date.now();
    let taskType = getTaskTypeData(actionId);
    let action = addTask(userId, taskType.description, timestamp, priority, assignedByUserId, memo, associatedContentId);
    applyUpdate(action);

    let assignedBy = getUserData(assignedByUserId);

    // Slack notification
    let slackData = {
      channel: "#hotseat",
      attachments: [
          {
              "fallback": taskType.description,
              "color": "#36a64f",
              "pretext": "You have just been assigned a task.",
              "author_name": assignedBy.name,
              "author_icon": "http://flickr.com/icons/bobby.jpg",
              "title": taskType.description,
              "title_link": siteUrl() + "/edit",
              "text": memo,
              "fields": [
                  {
                      "title": "Priority",
                      "value": "High",
                      "short": false
                  }
              ],
              "image_url": "http://my-website.com/path/to/image.jpg",
              "thumb_url": "http://example.com/path/to/thumb.png",
              "footer": "Slack API",
              "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
              "ts": 123456789
          }
      ]
    }

    slack.notify(slackData, function(err, result) {
        console.log(err, result);
    });

  });



  // ------- Media gallery -------
  socket.on('ADD_MEDIA', function(files) {
    files.forEach(file => {
      let newId = mediaItemIds++;
      let action = addMedia(file, newId, Date.now());
      applyUpdate(action);
      // To simulate upload, we just dispatched an upload finished action
      // after a timeout
      setTimeout(()=>{
        let action = finishUpload(newId);
        applyUpdate(action);
      }, 20000);
    });
  });

  socket.on('UPDATE_MEDIA_ITEM', function (mediaItem) {
    let action = updateMedia(mediaItem);
    applyUpdate(action);
  });


}