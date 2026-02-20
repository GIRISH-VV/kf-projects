import Todo from '../models/todo.model.js'

export const getList = async (req,res) => {
    try{
       const todos = await Todo.find()
       res.status(200).json(todos)
    }
    catch(error){
        res.status(500).json({ error : error.message})
    }
}

export const createList = async (req,res) => {
    try{
        const todo = await Todo.create({text:req.body.text})
        res.status(201).json(todo)
    } catch(error){
        res.status(500).json({ error : error.message})
    }
}

export const updateList = async (req,res) => {
    try{
        const updateData = { text : req.body.text }
        if (typeof req.body.completed === 'boolean') {
            updateData.completed = req.body.completed
        }

        const todo = await Todo.findByIdAndUpdate(req.params.id,
            updateData,
            {new : true}
        )
        if(!todo){
            return res.status(404).json({ message : "Todo not found"})
        }
        res.status(200).json(todo)
    } catch(error){
        res.status(500).json({ error : error.message})
    }
}

export const deleteList = async (req,res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo)
            res.status(500).json({ message : "Unable to Delete"})
        res.status(200).json({ message : "List Deleted Succesfully"})
    } catch(error){
        res.status(500).json({ error : error.message})
    }
}
