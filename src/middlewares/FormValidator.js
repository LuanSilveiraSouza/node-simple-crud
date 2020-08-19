const { check, body } = require('express-validator');

class FormValidator {
	validateUserRegister() {
		return [
			check('email', 'Email inválido').not().isEmpty().isEmail().normalizeEmail(),
			check('password', 'A senha deve conter no mínimo 5 caracteres')
				.not()
				.isEmpty()
        .isLength({ min: 5 }),
      check('password', 'As senhas não coincidem').trim().equals(body('repeat_password'))
		];
	}
}

module.exports = new FormValidator();
