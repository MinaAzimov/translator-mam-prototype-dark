import contentData from "../../../mock/contentItems";
import media from "../../../mock/media";

export function getContentItems(type) {
	if (type !== undefined) {
		return contentData.contentItems.filter(item => item.type === type);
	}
	return contentData.contentItems;
} 

export function getContentItem(itemId) {
	if (itemId !== undefined) {
		return contentData.contentItems.filter(item => item.id === itemId)[0];
	}
	return contentData.contentItems;
} 

export function getMediaItem(itemId) {
	let item = media.find(i => i.id === itemId);
	if (item) {
		return item;
	}
}