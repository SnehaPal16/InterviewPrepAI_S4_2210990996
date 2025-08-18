const {GoogleGenAI} = require("@google/genai");
const {questionAnswerPrompt , conceptExplainPrompt} = require('../utils/prompts');

const ai = new GoogleGenAI({ apiKey : process.env.GEMINI_API_KEY});

const generateInterviewQuestions = async(req , res) =>{
    try{
        const {role , experience , topicToFocus , numberOfQuestions} = req.body;

        if(!role || !experience || !topicToFocus || !numberOfQuestions){
            return res.status(400).json({message : "Missing Required Feilds"});
        }

        const prompt = questionAnswerPrompt(role , experience , topicToFocus , numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        })

        let rawText = response.text;

        const cleanedText = rawText.replace(/^```json\s*/ , "").replace(/```$/ , "").trim();

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message : "Failed To Generate Question" , error : error.message});
    }
}



const generateInterviewExplanation = async(req , res) =>{
    try{
        const {question} = req.body;

        if(!question){
            return res.status(400).json({message : "Missing Required Feilds"});
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        })

        let rawText = response.text;

        const cleanedText = rawText.replace(/^```json\s*/ , "").replace(/```$/ , "").trim();

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
        
    }
    catch(error){
        res.status(500).json({ message : "Failed To Generate Explanation" , error : error.message});
    }
}


module.exports = {generateInterviewQuestions , generateInterviewExplanation};