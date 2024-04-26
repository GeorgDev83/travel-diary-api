import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const registerUserController = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) throw generateErrorsUtils("Se esperaba email o contraseña!");
        res.send({data: {email, password}});
    } catch(error) {
        console.log(error);
        next(error);
    }
}


export default registerUserController;