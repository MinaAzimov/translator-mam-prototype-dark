import fieldsData from "../../../mock/fields.json";
import mediaList from "../../../mock/media.json";
import mediaGallery from "./media-gallery";
import { ContentState, convertToRaw, convertFromRaw  } from 'draft-js';
import { max, difference, remove } from "lodash"; 
import { Map } from "immutable";
import { createEditorState } from 'medium-draft'

const EDITABLE_TYPES = ['image', 'video'];



function getInitialState() {

  // Add a 'touched' flag
  const initialState = fieldsData.fields.map((field)=> {
    field.touched = false;
    return field;
  });

  initialState[15].value = mediaList.map(media => {
    const firstSentence = media.description.split('.').shift() || '';
    return {
      ...media,
      title: firstSentence,
      caption: firstSentence,
      editable: EDITABLE_TYPES.indexOf(media.type) !== -1
    }
  });

  let initialRteContent = ContentState.createFromText("This story is developing. Please check back for further updates.");

  initialState[14].blocks = {
    contentState: initialRteContent,
    editors: {},
    mostRecentChangeBy: null
  }

  return initialState;
}




function removeEditorFromAll(userId, editors) {
  for (let key in editors) {
    if (editors[key] === userId) {
      delete editors[key]; 
    }
  }
}



function rteditorBlocks(state, action) {

  let contentState = state.contentState;
  if (!(contentState instanceof ContentState)) {
    state = Object.assign({}, state, {
      contentState: convertFromRaw(contentState)
    });
  }

  switch (action.type) {

    case "CAPTURE_RTEDITOR_BLOCK": {
      let blockKeys = action.blockKeys;
      let editors = state.editors;
      let contentState = state.contentState;
      // Removing any existing for this user
      removeEditorFromAll(action.userId, editors);

      // Add the new
      blockKeys.forEach((key)=> {
        if (editors[key] === undefined) {
          editors[key] = action.userId;
          // Clone the block which will force react to render it
          //let blockClone = contentState.getBlockForKey(key).set("key", key);
          //contentState.getBlockMap().set(key, blockClone);
        }
        contentState = contentState.setIn(['blockMap', key, 'data', 'editor'], action.userId);
      });
      return {
        contentState: contentState,
        editors: Object.assign({}, editors),
        mostRecentChangeBy: state.mostRecentChangeBy
      }
    }

    case "RELEASE_RTEDITOR_BLOCK": {

      let editors = Object.assign({}, state.editors);
      let contentState = state.contentState;

      // Removing any existing for this user
      for (let key in editors) {
        if (editors[key] === action.userId) {
          delete editors[key]; 
        }
        // This 'touches' the block data so that the block in draft js gets rerendered
        // with a new class to indicate the block has been released
        contentState = contentState.setIn(['blockMap', key, 'data', 'editor'], action.userId);
      }

      return {
        contentState: contentState,
        editors: editors,
        mostRecentChangeBy: state.mostRecentChangeBy
      }
    }

    case "UPDATE_RTEDITOR_BLOCK": {

      const { userId } = action;
      const { blockKeys, newBlocks } = action.contentState;

      let editors = state.editors;
      let contentState = state.contentState;
      let blocks = contentState.getBlocksAsArray();

      // Add or replace any new blocks
      if (newBlocks) {
        let updateBlocks = convertFromRaw(newBlocks).getBlocksAsArray();
        // Iterate through the list of blocks we were told to update
        updateBlocks.forEach((block)=> {
          let key = block.getKey();
          let index = blocks.findIndex(b => b && b.getKey()===key);
          if (index !== -1) {
            // If the block exists, replace as long as no one else owns the block
            if (editors[key] === undefined || editors[key] === userId) {
              blocks[index] = block;
            }
            // Haha too late, someone beat this dude to it.
          }
          else {
            // If the block doesn't exist, insert it in the right position
            index = blockKeys.findIndex(k => k === key);
            blocks.splice(index, 0, block);
          }
          // The user should also capture the block
          editors = Object.assign({}, state.editors);
          removeEditorFromAll(userId, editors);
          editors[key] = userId;
        });
      }

      // Now lets remove any items that need removing
      let removedKeys = difference(blocks.map(b=> b && b.getKey()), blockKeys);
      remove(blocks, (b=> {
        let k = b.getKey();
        return removedKeys.indexOf(k) !== -1 && 
          (editors[k] === userId || editors[k] === undefined); 
      }));

      return {
        contentState: ContentState.createFromBlockArray(blocks),
        editors: editors,
        mostRecentChangeBy: userId
      }
    }
    default:
      return state;
  }
}

function field(state, action) {

  if (state.id === 14) {
    let field = Object.assign({}, state);
    field.blocks = rteditorBlocks(state.blocks, action);
    return field;
  }

  switch (action.type) {

    case "CAPTURE_FIELD": {
      return Object.assign({}, state, {
        currentEditor: action.userId
      });
    }

    case "RELEASE_FIELD": {
      return Object.assign({}, state, {
        currentEditor: null
      });
    }

    case "UPDATE_FIELD": {
      return Object.assign({}, state, {
        currentEditor: action.userId,
        value: action.value,
        touched: action.markAsTouched
      });
    }

    default:
      return state
  }


}



export default function fields(state = getInitialState(), action) {

  console.log(" ----------------- RUNNING ACTION: ", action.type + " ------------------");

  switch (action.type) {
    case "REVERT_CONTENT": {
      let rteBlocks = state[14].blocks;
      let initialState = getInitialState();
      //initialState[14].blocks = rteBlocks;
      return initialState;
    }
    case "ADD_MEDIA":
    case "FINISH_UPLOAD":
    case "UPDATE_MEDIA": {
      let newFields = state.slice();
      let galleryField = newFields[15];
      newFields[15] = Object.assign({}, galleryField, {value: mediaGallery(galleryField.value, action)});
      return newFields;
    }

  }

  if (action.fieldId !== undefined) {
    let newFields = state.map(f => {
      if (action.fieldId === f.id) {
        return field(f, action);
      }
      else {
        return f;
      }
    });
    return newFields;
  }
  else {
    return state;
  }
}
