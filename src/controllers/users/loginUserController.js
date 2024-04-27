import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEMailService from "../../services/users/selectUserByEmailService.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const loginUserController = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) throw generateErrorsUtils('Se esperaba email o password!', 400);

        const user = await selectUserByEMailService(email);

        let isValidPassword;

        if(user){
            isValidPassword = await bcrypt.compare(password, user.password);
        }

        if (!user || !isValidPassword) {
            throw generateErrorsUtils('Usuario o password incorrectos', 401);
        }

        if(!user.active) {
            throw generateErrorsUtils('Usuario pendiente de activación!', 403);
        }

        /**
         * El token identifica unequivocamente al usuario
         */
        const tokeInfo = {
            id: user.id,
            role: user.role
        };
        const token = jwt.sign(tokeInfo, process.env.SECRET, {
            expiresIn: '3d'
        });

        res.send({status: 'ok', token: token});


    } catch(error) {
        next(error);
    }
};

export default loginUserController;