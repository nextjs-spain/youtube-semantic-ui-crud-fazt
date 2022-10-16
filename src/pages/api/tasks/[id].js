import { dbConnect } from 'utils/mongoose';
import Task from 'models/Task'

dbConnect();

export default async function handler(req, res) {
    console.log(req.query)
    const {method , body , query:{id} } = req;

    switch (method) {
        case 'GET':
            try{
                const task = await Task.findById(id);
                if (!task) {
                    return res.status(400).json({ success: false });
                }
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({ msg: error.message})
            }
        case 'PUT':
            try {
                const task =  await Task.findByIdAndUpdate(id, body , 
                        {new: true, runValidators: true});
                if (!task) {
                    return res.status(400).json({ msg: "Task not found" });
                }
                return res.status(200).json(task);
            } 
            catch (error) {
                return res.status(500).json({ msg: error.message})
            }
        case 'DELETE':
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if(!deletedTask) return res.status(404).json({ msg: "Task not found" });
                return res.status(204).json({ msg: "Task deleted" });
            } catch (error) {
                return res.status(500).json({ msg: error.message})
            }
        default :
            return res.status(400).json({ msg: "this method is not supported" })
    }
}