export function mediaEditOpenIds(editMediaIds) {
  return {
    type: "MEDIA_EDIT_OPEN_IDS",
    editMediaIds
  }
}
export function mediaEditClose() {
  return {
    type: "MEDIA_EDIT_CLOSE"
  }
}
export function mediaEditReset() {
  return {
    type: "MEDIA_EDIT_RESET"
  }
}
