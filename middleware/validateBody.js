const Ajv = require("ajv");
const ajv = new Ajv();

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send("Incorrect Body");
      return;
    }
    next();
  };
}

module.exports = { validateBody };
