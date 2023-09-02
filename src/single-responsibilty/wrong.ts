import { Request, Response } from "express";
import { validationResult } from "express-validator";
const userModule = require("../../modules/user");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class userProfile {
    private static async checkCookies(req: Request) {
        console.log(req);
        let token = "ta";
        let ver = await jwt.verify(token, "process.env.JWT_SECRET_KEY");
        if (ver) return 1;
        else return 0;
    }
    private static validate(req: Request) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return false;
        }
        else {
            return true;
        }
    }
    private static checkPassword = (userPassword: any, DataBasePassword: any) => {
        if (bcrypt.hash(userPassword, 10) == DataBasePassword) return 1;
        else return 0;
    };
    static async getUser(req: Request, res: Response) {
        let { email } = req.body;
        if (!userProfile.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!userProfile.checkCookies(req)) {
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
    static async editUser(req: Request, res: Response) {
        let { name, password, email, mobile } = req.body;
        if (!userProfile.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!userProfile.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        if (!this.checkPassword(password, userModule.getUser(email).password)) {
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
    static async deleteUser(req: Request, res: Response) {
        let { name, password, email } = req.body;
        if (!userProfile.validate(req)) {
            return res.status(500).json({ msg: "internal error1" });
        }
        if (!userProfile.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        if (!this.checkPassword(password, userModule.getUser(email).password)) {
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
    static async enableUser(req: Request, res: Response) {
        let { name, password, email } = req.body;
        if (!userProfile.validate(req)) {
            return res.status(500).json({ msg: "internal error" });
        }
        if (!userProfile.checkCookies(req)) {
            return res.status(400).json({ msg: "not logIn " })
        }
        if (!this.checkPassword(password, userModule.getUser(email).password)) {
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
module.exports = userProfile;