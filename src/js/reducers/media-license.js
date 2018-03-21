const initialState = {
  placeholders: {},
  showLicenseModal: false,
  licenseMediaId: -1
};

export default function media(state = initialState, action) {
  switch (action.type) {
    case "MEDIA_LICENSE_OPEN": {
      return {
        licenseMediaId: action.mediaId,
        placeholders: action.placeholders,
        showLicenseModal: true
      };
    }
    case "MEDIA_LICENSE_CLOSE": {
      return {
        ...state,
        licenseMediaId: -1,
        showLicenseModal: false
      };
    }
  }
  return state;
}