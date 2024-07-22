const dynamoDB = require("./index");
const { v4: uuidv4 } = require("uuid");

async function addUserToDB({ userData }) {
	try {
		const params = {
			TableName: process.env.USERS_TABLE,
			Item: {
				id: uuidv4(),
				...userData,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isDeleted: false,
			},
			ReturnValues: "ALL_OLD",
		};

		await dynamoDB.put(params).promise();

		return params.Item;
	} catch (error) {
		console.log(
			"Server Error in utils/users at addUserToDB => Error : ",
			error
		);
	}
}

async function getAllUsersFromDB() {
	try {
		const params = {
			TableName: process.env.USERS_TABLE,
      FilterExpression: "isDeleted = :isDeleted",
			ExpressionAttributeValues: {
				":isDeleted": false,
			},
		};

		const allUsers = await dynamoDB.scan(params).promise();
		console.log("%c 🥚 allUsers", "color:#2eafb0", allUsers);

		if (allUsers && allUsers.Items && allUsers.Items.length > 0) {
			return allUsers.Items;
		}
		return [];
	} catch (error) {
		console.log(
			"Server Error in utils/users at getAllUsersFromDB => Error : ",
			error
		);
	}
}

async function getUserByIdFromDB({ userId }) {
	try {
		const params = {
			TableName: process.env.USERS_TABLE,
			Key: {
				id: userId,
			},
			FilterExpression: "isDeleted = :isDeleted",
			ExpressionAttributeValues: {
				":isDeleted": false,
			},
		};

		const userData = await dynamoDB.get(params).promise();
		console.log("%c 🌽 userData", "color:#2eafb0", userData);

		if (userData && userData.Item) {
			return userData.Item;
		}
		return null;
	} catch (error) {
		console.log(
			"Server Error in utils/users at getUserByIdFromDB => Error : ",
			error
		);
	}
}

async function updateUserByIdFromDB({ userId, userData }) {
	try {
		userData.updatedAt = new Date().toISOString();

		let keys = Object.keys(userData);
		let updateValues = {};
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			updateValues[`:${key}`] = userData[key];
		}

		let attributeValues = keys.map((key) => `${key} = :${key}`).join(", ");

		const params = {
			TableName: process.env.USERS_TABLE,
			Key: {
				id: userId,
			},
			UpdateExpression: "set " + attributeValues,
			ExpressionAttributeValues: updateValues,
			ReturnValues: "UPDATED_NEW",
		};

		const updatedUser = await dynamoDB.update(params).promise();
		console.log("%c 🥓 updatedUser", "color:#2eafb0", updatedUser);

		return updatedUser;
	} catch (error) {
		console.log(
			"Server Error in utils/users at updateUserByIdFromDB => Error : ",
			error
		);
	}
}

async function deleteUserByIdFromDB({ userId }) {
	try {
		const params = {
			TableName: process.env.USERS_TABLE,
			Key: {
				id: userId,
			},
			UpdateExpression: "set isDeleted=:isDeleted",
			ExpressionAttributeValues: {
				":isDeleted": true,
			},
		};

		await dynamoDB.update(params).promise();
	} catch (error) {
		console.log(
			"Server Error in utils/users at deleteUserByIdFromDB => Error : ",
			error
		);
	}
}

module.exports.addUserToDB = addUserToDB;
module.exports.getAllUsersFromDB = getAllUsersFromDB;
module.exports.getUserByIdFromDB = getUserByIdFromDB;
module.exports.deleteUserByIdFromDB = deleteUserByIdFromDB;
module.exports.updateUserByIdFromDB = updateUserByIdFromDB;
