const {
	addUserToDB,
	getAllUsersFromDB,
	getUserByIdFromDB,
	deleteUserByIdFromDB,
	updateUserByIdFromDB,
} = require("../../../../utils/users");

async function AddUserController(req, res) {
	console.log("%c 🌽 req.body", "color:#3f7cff", req.body);
	const { email, first_name, last_name, phone } = req.body;
	if (!email || !first_name || !last_name || !phone) {
		return res.status(400).json({
			status: false,
			message: "Please provide all the required fields",
		});
	}

	const user = await addUserToDB({userData : req.body});
	console.log("%c 🥝 user", "color:#ea7e5c", user);

	if (!user) {
		return res.status(400).json({
			status: false,
			message: "Failed to create user.",
		});
	}

	return res.status(201).json({
		status: true,
		data: user,
	});
}

async function GetAllUsersController(req, res) {
	try {
		const allUsers = await getAllUsersFromDB();
		console.log("%c 🍿 allUsers", "color:#3f7cff", allUsers);

		if (!allUsers) {
			return res.status(400).json({
				status: false,
				message: "Failed to fetch all users.",
			});
		}

		return res.status(200).json({
			status: true,
			data: allUsers,
		});
	} catch (error) {
		console.log(
			"Server Error in routes/v1/controllers/users/index.js at GetAllUsersController => Error : ",
			error
		);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error! Failed to fetch all users",
		});
	}
}
async function GetUserByUserIdController(req, res) {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(400).json({
				status: false,
				message: "Please provide all the required fields",
			});
		}
		const userData = await getUserByIdFromDB({
			userId: userId,
		});
		console.log("%c 🥥 userData", "color:#b03734", userData);

		if (!userData) {
			return res.status(400).json({
				status: false,
				message: "Failed to fetch user data.",
			});
		}

		return res.status(200).json({
			status: true,
			data: userData,
		});
	} catch (error) {
		console.log(
			"Server Error in routes/v1/controllers/users/index.js at GetUserByUserIdController => Error : ",
			error
		);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error! Failed to fetch user data",
		});
	}
}

async function DeleteUserByUserIdController(req, res) {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(400).json({
				status: false,
				message: "Please provide all the required fields",
			});
		}
		await deleteUserByIdFromDB({
			userId: userId,
		});

		return res.status(200).json({
			status: true,
			message: "User has been deleted successfully",
		});
	} catch (error) {
		console.log(
			"Server Error in routes/v1/controllers/users/index.js at DeleteUserByUserIdController => Error : ",
			error
		);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error! Failed to fetch delete user",
		});
	}
}

async function UpdateUserByUserIdController(req, res) {
	try {
		const {userId} = req.params;
		const userData = req.body;
		
		const updatedData = await updateUserByIdFromDB({
			userData : userData,
			userId : userId
		});
		console.log("%c 🍑 updatedData", "color:#b03734", updatedData);


		if (!updatedData || !updatedData.Attributes) {
			return res.status(400).json({
				status: false,
				message: "Failed to update user data.",
			});
		}

		return res.status(200).json({
			status: true,
			data: updatedData.Attributes,
		});
	} catch (error) {
		console.log(
			"Server Error in routes/v1/controllers/users/index.js at UpdateUserByUserIdController => Error : ",
			error
		);
		return res.status(500).json({
			status: false,
			message: "Internal Server Error! Failed to update user data",
		});
	}
}
module.exports.AddUserController = AddUserController;
module.exports.GetAllUsersController = GetAllUsersController;
module.exports.GetUserByUserIdController = GetUserByUserIdController;
module.exports.DeleteUserByUserIdController = DeleteUserByUserIdController;
module.exports.UpdateUserByUserIdController = UpdateUserByUserIdController;