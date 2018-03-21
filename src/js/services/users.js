import usersData from "../../../mock/users";

export function getUserData(userId) {
	return usersData.users.find(user => user.id === userId);
} 

export function getAllUsers(userId) {
	return usersData.users;
} 