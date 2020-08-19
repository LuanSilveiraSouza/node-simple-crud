const { body } = require('express-validator');

class FormValidator {
	validateUserRegister() {
		return [
			body('email', 'Email inválido')
				.exists()
				.not()
				.isEmpty()
				.isEmail()
				.normalizeEmail(),
			body('password', 'A senha deve conter no mínimo 5 caracteres')
				.exists()
				.not()
				.isEmpty()
				.isLength({ min: 5 }),
			body('password', 'As senhas não coincidem')
				.trim()
				.custom(async (password, { req }) => {
					const { repeat_password } = req.body;

					if (password !== repeat_password) {
						throw new Error();
					}
				})
		];
	}

	validateUserLogin() {
		return [
			body('username', 'Usuário ou Email não informados').exists().notEmpty(),
			body('password', 'A senha deve conter no mínimo 5 caracteres')
				.exists()
				.not()
				.isEmpty()
				.isLength({ min: 5 })
		];
	}
}

module.exports = new FormValidator();
