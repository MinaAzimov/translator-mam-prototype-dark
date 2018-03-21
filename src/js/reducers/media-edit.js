const initialState = {
  editMediaIds: [],
  showEditModal: false
};

export default function media(state = initialState, action) {
  switch (action.type) {
    case "MEDIA_EDIT_OPEN_IDS": {
      return {
        showEditModal: true,
        editMediaIds: action.editMediaIds || []
      };
    }
    case "MEDIA_EDIT_CLOSE": {
      return {
        showEditModal: false
      };
    }
    case "MEDIA_EDIT_RESET": {
      return initialState;
    }
  }
  return state;
}