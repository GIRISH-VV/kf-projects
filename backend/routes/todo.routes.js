import express from 'express'

import { getList , createList, updateList, deleteList} from '../controllers/todo.controller.js'
const router = express.Router()

router.get('/get',getList)
router.post('/create',createList)
router.put('/update/:id',updateList)
router.delete('/delete/:id',deleteList)

export default router