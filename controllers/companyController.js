// app/controllers/companyController.js
const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newCompany = new Company({ name, location });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Implement other CRUD operations as needed
