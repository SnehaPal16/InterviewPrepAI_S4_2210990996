const express = require("express");
const {togglePinQuestion , updateQustionNote , addQustionToSession} = require('../controllers/questionController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add' , protect , addQustionToSession);
router.post('/:id/pin' , protect , togglePinQuestion);
router.post('/:id/note' , protect , updateQustionNote);


module.exports = router;