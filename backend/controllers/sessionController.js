const Session = require('../models/Session');
const Question = require('../models/Questions');

const createSession = async (req , res) => {
    try {
        const {role , experience , topicsToFocus , description , questions} = req.body;

        const userId = req.user._id;

        const session = await Session.create({
            user : userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDoc = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session : session._id,
                    question : q.question,
                    answer : q.answer
                });
                return q._id;
            })
        );

        session.questions = questionDoc;
        await session.save();

        res.status(201).json({message : "Session Created Successfully" , session});
    } 
    catch (error) {
        res.status(500).json({message : "Server Error" , error : error.message});   
    }
}

const getSessionById = async (req , res) => {
    try {
        const sessions = await Session.find({user : req.user._id}).sort({createdAt : -1}).populate("questions");
        res.status(200).json(sessions);
    } 
    catch (error) {
        res.status(500).json({message : "Server Error" , error : error.message});   
    }
}

const getMySessions = async (req , res) => {
    try {
        const session = await Session.findById(req.params.id).populate({path : "questions" , options : {sort : {isPinned : -1 , createdAt : 1}}}).exec();

        if(!session){
            return res.status(404).json({message : "Session Not Found"});
        }

        res.status(200).json({message : "Session Fetched Successfully" , session});
    } 
    catch (error) {
        res.status(500).json({message : "Server Error" , error : error.message});   
    }
}

const deleteSessions = async (req , res) => {
    try {
        const session = await Session.findById(req.params.id);

        if(!session) {
            res.status(404).json({message : "Session Not Found"});
        }

        if(session.user.toString() !== req.user.id){
            return res.status(401).json({message : "This Session Is Not Your , So You Can't Delete This"});
        }

        await Question.deleteMany({session : session._id});
        await Session.deleteOne();

        res.status(200).json({message : "Session Deleted Successfully"})
    } 
    catch (error) {
        res.status(500).json({message : "Server Error" , error : error.message});   
    }
}

module.exports = {createSession , getSessionById , getMySessions , deleteSessions};