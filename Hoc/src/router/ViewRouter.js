import express from 'express'
import { increaseView , allView, totalView } from '../controllers/ViewController.js'

const routerView = express.Router()

routerView.post('/:episodeId' , increaseView)
routerView.get('/total/:movieId', totalView)
routerView.get('/all', allView)
export default routerView