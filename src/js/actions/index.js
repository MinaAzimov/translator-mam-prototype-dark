



/*--- CLIENT ONLY ---*/

export function dump(data) {
	return {
		type: "DUMP",
		data: data
	}
}

export function iLoggedIn(userData) {
	return {
		type: "I_LOGGED_IN",
		userData: userData
	}
}

export function readAllNotifications() {
	return {
		type: 'READ_ALL_NOTIFICATIONS'
	}
}

/*--- SHARED ---*/

export function userLogin(userId, sessionId, socketId) {
	return {
		type: "USER_LOGIN",
		userId: parseInt(userId),
		sessionId: sessionId,
		socketId: socketId
	}
}

export function userDisconnects(userId) {
	return {
		type: "USER_DISCONNECT",
		userId: parseInt(userId)
	}
}

export function userLogout(userId) {
	return {
		type: "USER_LOGOUT",
		userId: parseInt(userId)
	}
}

export function addChat(msg, userId, timestamp) {
	return {
		type: "ADD_CHAT",
		msg: msg,
		userId: userId,
		timestamp: timestamp
	}
}

export function captureField(userId, fieldId) {
	return {
		type: "CAPTURE_FIELD",
		userId: userId,
		fieldId: fieldId
	}
}

export function releaseField(fieldId) {
	return {
		type: "RELEASE_FIELD",
		fieldId: fieldId
	}
}

export function updateField(userId, fieldId, value, markAsTouched = true) {
	return {
		type: "UPDATE_FIELD",
		userId: userId,
		fieldId: fieldId,
		value: value,
		markAsTouched: markAsTouched
	}
}

export function revertContent() {
	return {
		type: "REVERT_CONTENT"
	}
}

export function lockContent(userId) {
	return {
		type: "LOCK_CONTENT",
		userId: userId
	}
}

export function unlockContent() {
	return {
		type: "UNLOCK_CONTENT"
	}
}

export function publishContent() {
	return {
		type: "PUBLISH_CONTENT"
	}
}



export function captureRTEditorBlock(userId, fieldId, blockKeys) {
	return {
		type: "CAPTURE_RTEDITOR_BLOCK",
		userId: userId,
		fieldId: fieldId,
		blockKeys: blockKeys
	}
}

export function releaseRTEditorBlock(fieldId, userId) {
	return {
		type: "RELEASE_RTEDITOR_BLOCK",
		fieldId: fieldId,
		userId: userId
	}
}

export function updateBlock(fieldId, userId, contentState) {
	return {
		type: "UPDATE_RTEDITOR_BLOCK",
		fieldId: fieldId,
		userId: userId,
		contentState: contentState
	}
}

export function insertBlockAfter(userId, fieldId, blockId, newBlockId, html) {
	return {
		type: "INSERT_RTEDITOR_BLOCK",
		fieldId: fieldId,
		blockId: blockId,
		userId: userId,
		html: html,
		newBlockId: newBlockId
	}	
}

export function addTask(userId, description, timestamp, priority, assignedByUserId, memo, associatedContentId) {
	return {
		type: "ADD_TASK",
		assignedTo: userId,
		assignedBy: assignedByUserId,
		description: description,
		assignedAt: timestamp,
		priority: priority,
		memo: memo,
		associatedContentId: associatedContentId
	}	
}


export function addMedia(fileData, id, timestamp) {
	return {
		type: "ADD_MEDIA",
		fileData: fileData,
		newId: id,
		timestamp: timestamp
	}
}

export function updateMedia(mediaItem) {
	return {
		type: "UPDATE_MEDIA",
		mediaItem: mediaItem
	}
}

export function finishUpload(itemId) {
	return {
		type: "FINISH_UPLOAD",
		itemId: itemId
	}
}

