import catchAsync from "../utils/catchAsyncUtil.js";
import APIFeatures from "../utils/apiFeaturesUtil.js";

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {

      const  id  = req.params._id;
      const doc = await Model.findOne({ _id: id, deletedAt: false }).select('-createdAt -updatedAt -__v');
      
      if (!doc) return res.status(404).json({ msg: "No document found with that ID!" });

      doc.deletedAt = true;
      doc.save();
      res.json({
        res: doc,
        msg: "Register was delete successfull!"
      });

    } catch (e) {
      return res.status(404).json({ msg: "Fatal error!" });
    }
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) return res.status(404).json({ msg: "No document found with that ID!" });
      
      res.status(200).json({
        res: doc,
        msg: "Register was update successfull!"
      });

    } catch (e) {
      return res.status(404).json({ msg: "Fatal error with that ID!" });
    }
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    try {

      const doc = await Model.create(req.body);

      res.status(200).json({
        res: doc,
        msg: "Register was create successfull!"
      });

    } catch (e) {      

      return res.status(404).json({ msg: "Fatal error!" });

    }
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    try {

      let query = Model.findById(req.params._id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) return res.status(404).json({ msg: "No document found with that ID!" });      
      
      res.status(200).json({ res: doc });

    } catch (e) {
      return res.status(404).json({ msg: "Fatal error with that ID!" });
    }
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      let filter = { deletedAt: false };
      const features = new APIFeatures(Model.find(filter), req.body)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        
      
      const doc = await features.query;
      const { page } = req.body
      
      res.status(200).json({
        res: doc,
        page: page
      });

    } catch (e) {
      console.log(e.message);
      return res.status(404).json({ msg: "Fatal error!" });
    }
  });
const countAll = (Model) =>
  catchAsync(async (req, res, next) => {
    try {

      let filter = { deletedAt: false };
      const features = new APIFeatures(Model.find(filter), req.body)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const count = await features.query.countDocuments();

      res.status(200).json({ res: count });

    } catch (e) {
      return res.status(404).json({ msg: "Fatal error!" });
    }
  });
export {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
  countAll
};