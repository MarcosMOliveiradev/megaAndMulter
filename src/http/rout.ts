import { Router } from 'express'
import express from 'express'
import upload from './controller/upload'
import multer from 'multer'
import { mega } from './util'

const rout = express.Router()


rout.get('/', (req, res) => res.json({message: 'Hello Word'}))

rout.post('/up', multer(upload).single('file'), async (req, res) => {
    const { originalname: name, size, filename: key } = req.file;
    mega(key, size)
  
  return res.json('post');
})

export default rout