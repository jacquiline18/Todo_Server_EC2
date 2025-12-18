import {signup,login} from '../Controller/lmsController.js';
import express from 'express';
import router from './lmsRoutes.js';    
router.post('/signup', signup);
router.post('/login', login);
export default router;
