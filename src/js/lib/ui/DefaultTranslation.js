"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultTranslation = exports.defaultTranslation = {
  dictDefaultMessage: '',
  // dictDefaultMessage: renderToStaticMarkup(reactDictDefaultMessage),
  dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
  dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
  dictFileTooBig: "You file is ({{filesize}}MiB). Maximum is:" + " {{maxFilesize}}MiB.",
  dictInvalidFileType: "Wrong filetype.",
  dictResponseError: "Response Error: {{statusCode}}",
  dictCancelUpload: "Cancel upload",
  dictCancelUploadConfirmation: "Do you want to cancel upload?",
  dictRemoveFile: "Remove file",
  dictRemoveFileConfirmation: null,
  dictMaxFilesExceeded: "Max Files Exceeded",
  dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" }
};