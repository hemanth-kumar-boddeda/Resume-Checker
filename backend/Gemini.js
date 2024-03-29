const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function gemini(jobDescription, applicantResume) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Evaluate the provided resume against the following job description and provide a score out of 10. Give me the missing elements and recommended additions to the resume if any in bullet points. If there are no missing elements and no recommended additions, respond with "No missing elements and no recommended additions" 

    Job Description:
    ${jobDescription}

    Applicant's Resume:
    ${applicantResume}

    Response Format:
    {"score": "score out of 10","missing": "elements missing in the resume","add": "recommended additions to the resume","updatedResume": "updated resume"}
    response must be of single string
    Note: Please ensure accurate scoring without personal bias. Provide the response in array format and don't provide space and \n 
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = { gemini };
