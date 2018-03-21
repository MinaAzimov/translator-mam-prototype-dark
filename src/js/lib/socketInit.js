import socketRoutes from "./socketRoutes";
import { convertToRaw, ContentState } from "draft-js";

export default function socketInit(io, store) {

  function applyUpdate(action) {
    store.dispatch(action);
    io.emit('ACTION', action);
  }

  io.on('connection', function(socket){

  	// Don't mutate the state here or you will suffer
    let stateToDump = JSON.parse(JSON.stringify(store.getState()));

    // This is a hack to get the rteditor to work
    let rteditorBlocks = store.getState().fields[14].blocks;
    if (rteditorBlocks.contentState) {
      stateToDump.fields[14].blocks.contentState = convertToRaw(rteditorBlocks.contentState);
    }

  	socket.emit('CONNECTED', stateToDump);
    socketRoutes(socket, applyUpdate, store);

  });
}