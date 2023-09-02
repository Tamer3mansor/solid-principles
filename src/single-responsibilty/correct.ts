import { Request, Response } from "express";
import { validationResult } from "express-validator";
const userModule = require("../../modules/user");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//class for validation
// reason to open >> validation 
class validation {
    static async checkCookies(req: Request) {
        console.log(req);
        let token = "ta";
        let ver = await jwt.verify(token, "process.env.JWT_SECRET_KEY");
        if (ver) return 1;
        else return 0;
    }
    static validate(req: Request) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return false;
        }
        else {
            return true;
        }
    }
    static checkPassword = (userPassword: any, DataBasePassword: any) => {
        if (bcrypt.hash(userPassword, 10) == DataBasePassword) return 1;
        else return 0;
    };
}
//class for get user
// reason to open >> get user 
class getUser {
    static async getUser(req: Request, res: Response) {
        let { email } = req.body;
        if (!validation.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!validation.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        let result = await userModule.getUser(email);
        if (result) {
            res.status(200).json({ msg: result });
        }
        else {
            res.status(500).json({ msg: "internal error" });

        }

    };
}
//class for edit user
// reason to open >> edit user
class editUser {
    static async editUser(req: Request, res: Response) {
        let { name, password, email, mobile } = req.body;
        if (!validation.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!validation.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        if (!validation.checkPassword(password, userModule.getUser(email).password)) {
            return res.status(400).json({ msg: "wrong password" })
        }
        let result = await userModule.editUser(name, password, email, mobile);
        if (result) {
            return res.status(200).json({ msg: result });
        }
        else {
            return res.status(500).json({ msg: "internal error" });

        }
    };
}
//class for enable user
// reason to open >> enable user
class enable {
    static async enableUser(req: Request, res: Response) {
        let { name, password, email } = req.body;
        if (!validation.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!validation.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        if (!validation.checkPassword(password, userModule.getUser(email).password)) {
            return res.status(400).json({ msg: "wrong password" })
        }
        let result = await userModule.alterEnable(!userModule.getUser(email).enable);
        if (result) {
            return res.status(200).json({ msg: result });
        }
        else {
            return res.status(500).json({ msg: "internal error" });

        }
    };
    static async disableUser(req: Request, res: Response) {
    };

}
//class for delete user
// reason to open >> delete user
class deleteUser {
    static async deleteUser(req: Request, res: Response) {
        let { name, password, email } = req.body;
        if (!validation.validate(req)) {
            return res.status(500).json({ msg: "internal error1" });
        }
        if (!validation.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        if (!validation.checkPassword(password, userModule.getUser(email).password)) {
            return res.status(400).json({ msg: "wrong password" })
        }
        let result = await userModule.deleteUser(name, email);
        console.log(result);
        if (result) {
            return res.status(200).json({ msg: result });
        }
        else {
            return res.status(500).json({ msg: "internal error2" });

        }
    };


}
module.exports = {
    deleteUser,
    editUser,
    enable,
    getUser
};