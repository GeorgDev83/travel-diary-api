import insertUserService from "../../services/users/insertUserService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import randomstring from 'randomstring';

const registerUserController = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) throw generateErrorsUtils("Se esperaba email o contraseña!");

        const registrationCode = randomstring.generate(10);

        await insertUserService(email, password, registrationCode);

        res.send({status: 'ok', message: 'Usuario registrado correctamente'});
    } catch(error) {
        next(error);
    }
}


export default registerUserController;