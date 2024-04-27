import updateUserService from "../../services/users/updateUserService.js";

const editUserController = async(req, res, next)=> {
    try {
        const {userId} = req.params;

        const {firstName, lastName} = req.body;

        await updateUserService(userId, firstName, lastName);

        res.send({status: 'ok', message: 'Usuario modificado correctamente!'});
    } catch(error) {
        next(error);
    }
};

export default editUserController;