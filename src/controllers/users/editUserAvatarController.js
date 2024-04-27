import selectUserByIdService from '../../services/users/selectUserByIdService.js';
import updateUserAvatarService from '../../services/users/updateUserAvatarService.js';
import { deletePhotoUtils, savePhotoUtils } from '../../utils/photoUtils.js';

const editUserAvatarController = async (req, res, next) => {
    try {
        const user = await selectUserByIdService(req.user.id);

        if(user.avatar) {
            await deletePhotoUtils(user.avatar);
        }

        const avatarName = await savePhotoUtils(req.files.avatar, 100);

        await updateUserAvatarService(avatarName, req.user.id);

        res.send({status: 'ok', message: 'Avatar actualizado correctamente!'});
    } catch(error) {
        next(error);
    }
}

export default editUserAvatarController;