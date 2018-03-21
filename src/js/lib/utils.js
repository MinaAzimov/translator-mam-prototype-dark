import { PUBLIC_HOST, PUBLIC_PORT } from '../settings';


export function isClient() {
	return ! (typeof window === 'undefined');
}

export function siteUrl() {
	return "http://" + PUBLIC_HOST + (PUBLIC_PORT ? ":" + PUBLIC_PORT : "");
}

export function staticUrl(path) {
	//return "http://" + PUBLIC_HOST + (PUBLIC_PORT ? ":" + PUBLIC_PORT : "") + "/assets" + path;
	return "assets" + path;
}