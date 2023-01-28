const express = require('express');
const router = express.Router();
const QuizzesController = require('../controllers/quizzes.controller');
const quizzesController = new QuizzesController();
const authMiddleWare = require('../middleware/abcdefg')

router.post('/', authMiddleWare, quizzesController.createQuiz);
router.get('/', quizzesController.getAllQuiz);
router.get('/:qId', authMiddleWare, quizzesController.getQuiz);
router.put('/:qId', authMiddleWare, quizzesController.updateQuiz);
router.delete('/:qId', authMiddleWare, quizzesController.deleteQuiz);

router.put('/like/:qId', authMiddleWare, quizzesController.likeEvent);

module.exports = router;
