const FormPayment = require('../models/FormPayment');

module.exports = {
  async index(req, res) {
    const formPayment = await FormPayment.findAll();

    return res.json(formPayment);
  },
  async store(req, res) {
    const { description } = req.body;

    const [ formPayment ] = await FormPayment.findOrCreate({
      where: { description }
    });

    return res.json(formPayment);
  },
};