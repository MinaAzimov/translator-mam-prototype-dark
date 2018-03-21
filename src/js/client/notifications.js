
import moment from "moment"
import { getUserData } from '../services/users'
/********************

	This function maps a redux action to a notification.
	A notification is an object with these properties:
	 
	{
			image: URL TO IMAGE,
			text: TEXT FOR THE NOTIFICATIONS
	    link: ROUTE OR URL FOR CALL TO ACTION
	    timestamp: UNIX TIMESTAMP OF WHEN IT WAS ISSUED
	}

/********************/

export function getNotificationFromAction(action) {

	switch (action.type) {
		
		case 'ADD_TASK': {

			let imgSrc = getUserData(action.assignedBy).avatarImgPath;

			return {
				imgSrc: imgSrc,
				text: "You have been assigned a task - " + action.description,
				link: "/edit",
				timestamp: action.assignedAt
			}
		}

		default:
			return null;


	}


}
