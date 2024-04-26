import selectUserByIdService from "../../services/users/selectUserByIdService.js";

const getUserProfileController = async(req, res, next)=> {
    try {
        const {userId} = req.params;

        const user = await selectUserByIdService(userId);

        res.send({
            status: 'ok',
            data: user
        });

    } catch(error) {
        next(error);
    }
};

export default getUserProfileController;