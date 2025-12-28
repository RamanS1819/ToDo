import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
      try {
            const {title, description} = req.body;

            // const task = new Task({title, description, completed: false});
            // await task.save();
            //////////////// or ///////////////////
            await Task.create({
                  title,
                  description, 
                  user: req.user,
            });

            res.status(201).json({
                  success: true,
                  message: "Task created successfully",
            });
      } 
      catch (error) {
            next(error);
      }
};

export const getMyTasks = async (req, res, next) => {
      try {
            const userid = req.user._id;

            const tasks = await Task.find({user: userid});

            res.status(200).json({
                  success: true,
                  tasks,
            });
      } catch (error) {
            next(error);
      }
};

export const updateTasks = async (req, res, next) => {
      try {
            const {id} = req.params;

            // Find the task by id and update it
            const task = await Task.findById(id);

            if(!task){
                  return next(new ErrorHandler("Task not found", 404));
            }

            task.iscompleted = !task.iscompleted;

            await task.save();

            res.status(200).json({
                  success: true,
                  message: "Task updated successfully !",
            });
      } catch (error) {
            next(error);
      }
};

export const deleteTasks = async (req, res, next) => {
      try {
            const {id} = req.params;
            // Find the task by id and delete it
            // await Task.findByIdAndDelete(id);
            /////////// or ///////////
            const task = await Task.findById(id);

            if(!task){
                  return next(new ErrorHandler("Task not found", 404));
            }

            await task.deleteOne();

            res.status(200).json({
                  success: true,
                  message: "Task deleted successfully !",
            });
      } catch (error) {
            next(error);
      }
};