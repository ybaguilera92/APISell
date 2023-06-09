import catchAsync from "../utils/catchAsyncUtil.js";
import AppError from "../utils/appErrorUtil.js";
import APIFeatures from "../utils/apiFeaturesUtil.js";
import {
  addLog,
  getLogs
} from "./logController.js";
const deleteOne = (Model, Module) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params._id);
      console.log(doc);
      if (!doc) {
        addLog(req, Module, "Delete", "No document found with that Id!");
        return next(new AppError("No document found with that ID", 404));
      }

      addLog(req, Module, "Delete", "Registro eliminado satisfactoriamente!!");
      res.json({
        res: doc,
        msg: "Registro eliminado satisfactoriamente!!"
      });
    } catch (e) {
      addLog(req, Module, "Delete", "Fatal error with that Id!");
      return res.status(404).json({
        msg: "Fatal error with that ID!"
      });
    }
  });

const updateOne = (Model, Module) =>
  catchAsync(async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        addLog(req, Module, "Update", "No document found with that Id!");
        return next(new AppError("No document found with that ID", 404));
      }

      addLog(req, Module, "Update", "succ: register was update successfull!");
      res.status(200).json({
        res: doc,
        msg: "Registro actualizado satisfactoriamente!!"
      });
    } catch (e) {
      addLog(req, Module, "Update", "Fatal error with that Id!");
      return res.status(404).json({
        msg: "Fatal error with that ID!"
      });
    }
  });

const createOne = (Model, Module) =>
  catchAsync(async (req, res, next) => {
    try {
      console.log(req.body);
      const doc = await Model.create(req.body);
      console.log(doc);
      addLog(req, Module, "Create", "Register was create successfull!");
      res.status(200).json({
        res: doc,
        msg: "Registro creado satisfactoriamente!!"
      });
    } catch (e) {
      console.log(e.message);
      addLog(req, Module, "Create", "Fatal error!");
      return res.status(404).json({
        msg: "Fatal error!"
      });
    }
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    try {
      let query = Model.findById(req.params._id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }
      res.status(200).json({
        res: doc
      });
    } catch (e) {
      return res.status(404).json({
        msg: "Fatal error with that ID!"
      });
    }
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      let filter = {
        deleteAt: false
      };
      const features = new APIFeatures(Model.find(filter), req.body)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query;
      const { page }= req.body
      res.status(200).json({
        res: doc,
        page: page
      });
    } catch (e) {
      return res.status(404).json({
        msg: "Fatal error!"
      });
    }
  });
const countAll = (Model) =>
  catchAsync(async (req, res, next) => {
    try {
      let filter = {
        deleteAt: false
      };
      const features = new APIFeatures(Model.find(filter), req.body)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const count = await features.query.countDocuments();
      res.status(200).json({
        res: count
      });
    } catch (e) {
      return res.status(404).json({
        msg: "Fatal error!"
      });
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