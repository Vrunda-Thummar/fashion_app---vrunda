const UserServices = require('../../services/user.services');
const userService = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email });
        // console.log(user);
        if (user) {
            return res.json({ message: "Admin already Exist...please try to login." });
        };
        if (req.file) {
            // console.log(req.file);
            req.body.profileImage = req.file.path.replace('\\', '/');
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashpassword);
        user = await userService.addNewUser({ ...req.body, password: hashpassword, isAdmin: true });
        return res.json({user, message: "New admin Registration successful" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from admin controller" });
    }
};

exports.getAllAdmin = async (req, res) => {
    try {
        let user = await userService.getAllUser({ isAdmin: true, isDelete: false });
        // console.log(user);
        if (!user) {
            return res.json({ message: "Admin is not found.Please try again" });
        }
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from admin controller" });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        let Admin = req.admin;
        // console.log(Admin);
        return res.json(Admin);
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from admin controller" });
    }
}

exports.logInAdmin = async (req, res) => {
    try {
        let Admin = await userService.getUser({ email: req.body.email, isAdmin: true, isDelete: false });
        if (!Admin) {
            return res.json({ message: "Admin is not found.Please try again" });
        };
        let comparepassword = await bcrypt.compare(req.body.password, Admin.password);
        if (!comparepassword) {
            return res.json({ message: "Password is not match.Please try again." });
        };
        let payLoad = { adminID: Admin._id };
        let token = jwt.sign(payLoad, "Admin");
        // console.log(token);
        return res.json({ Token: token, message: "Admin is Login successfully." });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from admin controller" });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        let Admin = await userService.getUserById(req.admin._id);
        // console.log(Admin);
        if (!Admin) {
            return res.json({ message: "Admin is not found..Please try again" });
        };
        if (req.file) {
            // console.log(req.file);
            req.body.profileImage = req.file.path.replace('\\', '/');
        }
        Admin = await userService.updateUser(req.admin._id, { ...req.body });
        // console.log(Admin);
        return res.json({ Admin, message: "Admin Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from admin controller" });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        let Admin = await userService.getUserById(req.admin._id);
        // console.log(Admin);
        if (!Admin) {
            return res.json({ message: "Admin is not found.. Please try again" });
        };
        Admin = await userService.updateUser(req.admin._id, { isDelete: true });
        return res.json({ message: "Admin deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from admin controller" });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        let Admin = await userService.getUserById(req.admin._id);
        // console.log(Admin);
        if (!Admin) {
            return res.json({ message: "Admin is not found..Please try again" });
        };
        let comparePass = await bcrypt.compare(req.body.OldPassword, req.admin.password);
        let old = req.body.OldPassword;
        if (!old) {
            return res.json({ message: "Old password is not found" });
        };
        if (!comparePass) {
            return res.json({ message: "Old Password is not matched" });
        };
        let New = req.body.NewPassword;
        if (!New) {
            return res.json({ message: "New Password is not found" });
        };
        if (old == New) {
            return res.json({ message: "Old & New Password is same..Please enter diffrent password" });
        };
        let confirm = req.body.ConfirmPassword;
        if (!confirm) {
            return res.json({ message: "Confirm Password is not found" });
        };
        if (New !== confirm) {
            return res.json({ message: "New & Confirm Password is not matched." });
        };
        let hashpassword = await bcrypt.hash(confirm, 10);
        Admin = await userService.updateUser(req.admin._id, { password: hashpassword });
        return res.json({ message: "New Password is Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Serverb Error from admin controller" });
    }
};