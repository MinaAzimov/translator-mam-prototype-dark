import chat from './chat'
import users from './users'
import client from './client'
import fields from './fields'
import tasks from './tasks'
import mediaEdit from './media-edit'
import mediaLicense from './media-license'
import contentItem from './content-item'
import uploads from './uploads'
import { isClient } from '../lib/utils';
import { combineReducers } from 'redux'

let rootReducer;

if (isClient()) {
	let reducers = combineReducers({
	  client, chat, users, fields, tasks, mediaEdit, mediaLicense, contentItem, uploads
	})

	rootReducer = (state, action) => {
	  // We use the DUMP action to sync client stores with the server
	  // This action will dump all the properties of action.data into the store
	  // while preserving the 'client' property
	  if (action.type === 'DUMP') {
	    return Object.assign({}, action.data, { 
	    	client: state.client,
	    	mediaEdit: state.mediaEdit,
	    	mediaLicense: state.mediaLicense
	    });
	  }
	  return reducers(state, action);
	}
} else {
	rootReducer = combineReducers({
	  chat, users, fields, tasks, contentItem, uploads
	});
}

export default rootReducer
