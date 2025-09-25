import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    const { filter = "today" } = req.query;
    const today = new Date();
    let startData;

    switch (filter) {
        case "today": {
            startData = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            break;
        }
        case "week": {
            const mondayDate = (today.getDay() - 1) - (today.getDay() === 0 ? 7 : 0);
            startData = new Date(today.getFullYear(), today.getMonth(), mondayDate);
            break;
        }
        case "month": {
            startData = new Date(today.getFullYear(), today.getMonth(), 1);
            break;
        }
        case "all":
        default: {
            startData = null;
        }
    }

    const query = startData ? { createdAt: { $gte: startData } } : {};

    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }]
                }
            }
        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({
            tasks,
            activeCount,
            completeCount
        });
    } catch (error) {
        console.log("Lỗi khi gọi getAllTasks", error);
        res.status(500).json({ message: error.message });
    }
}

export const createTasks = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.log("Lỗi khi gọi createTasks", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateTasks = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log("Lỗi khi gọi updateTasks", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteTasks = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log("Lỗi khi gọi deleteTasks", error);
        res.status(500).json({ message: error.message });
    }
}