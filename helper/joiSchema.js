const joi = require('joi');

const check_memberId = /^[a-zA-Z0-9]{4,20}$/;
const check_password = /^[a-zA-Z0-9]{4,20}$/;

exports.memberSchema = joi.object({
    memberId: joi.string().pattern(check_memberId).required(),
    password: joi.string().pattern(check_password).required(),
    nickname: joi.string(),
  });