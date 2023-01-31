const Joi = require('joi');
const { ValidationError } = require('../exceptions/index.exception');

module.exports = {
  signupSchema: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .required()
      .error(new ValidationError('올바른 이메일 형식이 아닙니다.')),

    name: Joi.string()
      .min(3)
      .alphanum()
      .required()
      .error(
        new ValidationError('이름은 최소 3자 이상으로 구성되어야 합니다.')
      ),

    nickname: Joi.string()
      .min(3)
      .alphanum()
      .required()
      .error(
        new ValidationError(
          '닉네임은 최소 3자 이상, 알파벳 대소문자, 숫자로 구성되어야 합니다.'
        )
      ),
    password: Joi.string()
      .min(4)
      .required()
      .error(new ValidationError('비밀번호는 최소 4자 이상이어야 합니다.')),
  }),

  loginSchema: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .required()
      .error(new ValidationError('올바른 이메일 형식이 아닙니다.')),
    password: Joi.string()
      .min(4)
      .required()
      .error(new ValidationError('닉네임 또는 패스워드를 확인해주세요.')),
  }),
};
