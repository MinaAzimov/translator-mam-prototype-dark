

let clientStore = null;

export function authInit(store) {
	clientStore = store;
}

export function isLoggedIn() {
	if (clientStore) {
		const client = clientStore.getState().client;
		return client.user !== null;
	}
	return false;
}