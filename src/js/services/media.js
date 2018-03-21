
import moment from "moment";

import { 
	AP_OPTIONS,
  GETTY_OPTIONS,
  LAST_USED_FORMAT,
  EXPIRATION_FORMAT
} from '../constants/media';


export function getSize(mediaItem) {
  const licenseSize = Object.keys(GETTY_OPTIONS).reduce((size, currentSize) => {
	  if (!size || GETTY_OPTIONS[currentSize].width <= mediaItem.width) {
	    return currentSize;
	  }
	  return size;
  }, '');
  return licenseSize;
}




export function getExpiration(mediaItem) {
	if (mediaItem.expire === null) 
		return null;
  const lastUsedMoment = moment(mediaItem.lastused, LAST_USED_FORMAT);
  const expire = AP_OPTIONS[mediaItem.expire].split(' ');
  const expiration = lastUsedMoment.add(expire[0], expire[1]).format(EXPIRATION_FORMAT);
  return expiration;
}