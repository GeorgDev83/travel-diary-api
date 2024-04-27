import selectUserByEMailService from '../../services/users/selectUserByEmailService.js';
import updateRecoverPassService from '../../services/users/updateRecoverPassService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import randomstring from 'randomstring';

const sendRecoverPassController = async (req, res, next) => {
	try {
		const { email } = req.body; //porque es a través de formulario

		const user = await selectUserByEMailService(email);

		if (!user) throw generateErrorsUtils('Email no registrado!', 404);

		const recoverPassCode = randomstring.generate(10);

		await updateRecoverPassService(email, recoverPassCode);

		res.send({ status: 'ok', message: 'Correo de recuperación enviado!' });
	} catch (error) {
		next(error);
	}
};

export default sendRecoverPassController;
