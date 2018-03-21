


export default function mediaGallery(state = [], action) {

	switch (action.type) {
    // We have treated the media gallery as field 15
    case "ADD_MEDIA": {
      let galleryItems = state.slice();
      let fileData = action.fileData;
      let type = fileData.type.split("/")[0];
      galleryItems.unshift({
      	"title": fileData.name,
      	"caption": "",
        "id": action.newId,
        "type": type,
        "slug": fileData.name,
        "description": "",
        "creator": "",
        "tag": [],
        "width": 530,
        "height": 298,
        "source": "CNBC",
        "filename": "/assets/img/media/" + fileData.name,
        "licensed": false,
        "lastused": "2016-11-08-09-37",
        "onetime": false,
        "premium": false,
        "expire": null,
        "uploading": true
      })

      return galleryItems;
    }

    case "UPDATE_MEDIA": {
      let galleryItems = state.slice();
      let index = galleryItems.findIndex(item => item.id === action.mediaItem.id);
      galleryItems[index] = action.mediaItem;
      return galleryItems;
    }

    // We have treated the media gallery as field 15
    case "FINISH_UPLOAD": {
      let galleryItems = state.slice();
      let index = galleryItems.findIndex(item => item.id === action.itemId);
      galleryItems[index] = Object.assign({}, galleryItems[index], { uploading: false });
      return galleryItems;
    }
	}
}


