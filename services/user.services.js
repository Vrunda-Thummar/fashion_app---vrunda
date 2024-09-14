const User = require('../model/user.model');

module.exports = class UserServices {
    async addNewUser(body) {
        try {
            return await User.create(body)
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error From user services" });
        }
    };

    async getUser(body) {
        try {
            return await User.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from user services" });
        }
    };

    async getAllUser(body) {
        try {
            return await User.find(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from user services" });
        }
    };

    async getUserById(id) {
        try {
            return await User.findById(id)
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from user services" });
        }
    };

    async updateUser(id, body) {
        try {
            return await User.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from user services" });
        }
    };
};