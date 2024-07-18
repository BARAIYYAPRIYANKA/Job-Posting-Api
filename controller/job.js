const JobModel = require("../model/job");

const createJob = async (req, res) => {
  try {
    const newlyInsertedJob = await JobModel.create(req.body);
    res.json({
      success: true,
      message: "Job created successfully",
      job: newlyInsertedJob
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });
  }
};

const listJob = async (req, res) => {
  const minSalary = req.query.minSalary || 0;
  const titleQuery = req.query.title ? { title: { $regex: new RegExp(`${req.query.title}`, "gi") } } : {};
  
  try {
    const jobsList = await JobModel.find({
      ...titleQuery,
      salary: { $gte: minSalary },
    });
    res.json({
      success: true,
      message: "Jobs list",
      results: jobsList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });
  }
};

const updateJob = async (req, res) => {
  const updateObj = { $set: req.body };
//   const filterObj = { salary: { $lte: 95000 } };

  try {
    const response = await JobModel.findByIdAndUpdate(req.params.id, updateObj);
    // const response = await JobModel.updateMany( updateObj);
    res.json({
      success: true,
      message: "Update job API",
      results: response
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    await JobModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });
  }
};

const jobController = {
    createJob,
    listJob,
    updateJob,
    deleteJob,
};

module.exports = jobController;