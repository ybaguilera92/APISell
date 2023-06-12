import userSchema from "../userModel.js";

export default async function userSeeder() {
	const data = await userSchema.find({}).exec();
	if (data.length !== 0) {
		// Data exists, no need to seed.
		return;
	}

	await new userSchema({
		_id:process.env._ID,
		name: process.env.NAME,
		lastName: process.env.LASTNAME,
		username: process.env.USERNAME,
		email:process.env.EMAIL,
		password:process.env.PASSWORD,
		role: process.env.ROLE,
		address: process.env.ADDRESS,
		phone: process.env.PHONE,
	}).save();
}
