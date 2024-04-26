import insertUserService from "../../services/users/insertUserService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const registerUserController = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) throw generateErrorsUtils("Se esperaba email o contraseña!");

        await insertUserService(email, password);

        res.send({status: 'ok', message: 'Usuario registrado correctamente'});
    } catch(error) {
        next(error);
    }
}


export default registerUserController;