import updateUserPassService from '../../services/users/updateUserPassService.js';

const editUserPasswordController = async (req, res, next) => {
	try {
		const { email, recoverPassCode, newPassword } = req.body;

		await updateUserPassService(email, recoverPassCode, newPassword);

		res.send({
			status: 'ok',
			message: 'Contraseña actualizada correctamente!',
		});
	} catch (error) {
		next(error);
	}
};

export default editUserPasswordController;
