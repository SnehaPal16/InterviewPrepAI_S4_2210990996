const Question = require("../models/Questions");
const Session = require("../models/Session");

const addQuestionToSession = async(req , res) => {
    try{
        const {sessionId , questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)){
            return res.status(400).json({message : "Invalid Input Data"});
        }

        const session = await Session.findById(sessionId);

        if(!session){
            return res.status(404).json({message : "Session Not Found"});
        }

        // new question creation
        const createQuestions = Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        )

        // session ko update krna hai
        session.questions.push(...createQuestions.map((q) => (q._id)));
        await session.save();

        res.status(201).json(createQuestions);

    }
    catch(error){
        res.status(500).json({message : "Server Error"});
    }
};

const togglePinQuestion = async(req , res) => {
    try{
        const question = await Question.findById(req.param.id);

        if(!question){
            return res.status(404).json({message : "Question Not Found"});
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({success : true , question})

    }
    catch(error){
        res.status(500).json({message : "Server Error"});
    }
}

const updateQuestionNote = async(req , res) => {
    try{
        const {note} = req.body;
        const question = await Question.findById(req.param.id);

        if(!question){
            return res.status(404).json({message : "Question Not Found"});
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({success : true , question})
    }
    catch(error){
        res.status(500).json({message : "Server Error"});
    }
}

module.exports = {addQuestionToSession , togglePinQuestion , updateQuestionNote}