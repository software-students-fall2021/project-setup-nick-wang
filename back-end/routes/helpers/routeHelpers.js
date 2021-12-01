const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error.details[0].message);
      }
      // // rea.value.body instead req.body
      // if (!req.value) {
      //   req.value = {};
      // }
      // req.value["body"] = result.value;
      next();
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(12).required(),
      password: Joi.string().alphanum().min(3).max(12).required(),
    }),
  },
};
