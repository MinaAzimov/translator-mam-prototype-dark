export function mediaLicenseOpen(mediaId, placeholders) {
  return {
    type: "MEDIA_LICENSE_OPEN",
    mediaId,
    placeholders
  }
}
export function mediaLicenseClose() {
  return {
    type: "MEDIA_LICENSE_CLOSE"
  }
}
