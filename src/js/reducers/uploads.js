
const initialState = [];

export default function uploads(state = initialState, action) {
  switch (action.type) {
    case "ADD_MEDIA": {
      let uploadList = state.slice();
      uploadList.push({
        mediaItemId: action.newId,
        startedAt: action.timestamp
      })
      return uploadList;
    }
    case "FINISH_UPLOAD": {
      let uploadList = state.slice();
      let index = uploadList.findIndex(upload => upload.mediaItemId === action.id);
      if (index) {
        uploadList.splice(index, 1);
      }
      return uploadList;
    }
    default:
      return state
  }
}
