import generateErrorsUtils from "../utils/generateErrorsUtils.js";
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if(!authorization) {
            throw generateErrorsUtils('Se esperaba un token en el encabezado!', 401);
        }

        let tokenInfo;
        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch(error) {
            throw generateErrorsUtils('Credenciales invalidas', 401);
        }
        
        req.user = tokenInfo;

        next();
    } catch (error) {
        next(error);
    }
};

export default authUser;