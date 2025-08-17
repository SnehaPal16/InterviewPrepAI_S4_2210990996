const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt} = require('../utils/prompts');

const ai = new GoogleGenAI({ apiKey : process.env.GEMINI_API_KEY});

const generateInterviewQuestions = async(req , res) =>{
    try{
        const {role , experience , topicToFocus , numberOfQuestions} = req.body;

        if(!role || !experience || !topicToFocus || !numberOfQuestions){
            return res.status(400).json({message : "Missing Required Feilds"});
        }

        const prompt = questionAnswerPrompt(role , experience , topicToFocus , numberOfQuestions);

        const response = await ai.models.generateContent({
            
        })
    }
    catch(error){
        res.status(500).json({ message : "Failed To Generate Question" , error : error.message});
    }
}

const generateInterviewExplanation = async(req , res) =>{
    
}


module.exports = {generateInterviewQuestions , generateInterviewExplanation};