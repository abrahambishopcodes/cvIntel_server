const pdf = require("pdf-parse")
const fs = require("fs")
const asyncHandler = require('express-async-handler')
const OpenAI = require("openai").OpenAI;
const { cleanPdfText } = require("..//utils/cleanText.utils")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const analyzeResumeWithJd = asyncHandler(async (req, res) => {

    const {jobDescription} = req.body;

    const resume = req.file;
    const resumeDataBuffer = fs.readFileSync(resume.path);
    const resumeData = await pdf(resumeDataBuffer);


   const response = await openai.responses.create({
  model: process.env.OPENAI_AI_MODEL,
  instructions: `You are an expert career coach and resume analyzer. Your task is to evaluate a candidate's resume against a provided job description.`,
  input: `Job Description: ${jobDescription}, Resume: ${cleanPdfText(resumeData.text)}, provide a match score from 1-100, list any missing skills or qualifications, and suggest improvements to enhance the resume's alignment with the job description. Summarize your findings in a concise report.`,
    text: {
    format: {
      type: "json_schema",
      name: "ResumeAnalysis",
      schema: {
        type: "object",
        properties: {
          matchScore: { type: "number" },
          missingSkills: {
            type: "array",
            items: { type: "string" }
          },
          suggestedImprovements: {
            type: "array",
            items: { type: "string" }
          },
          reportSummary: { type: "string" }
        },
        required: ["matchScore", "missingSkills", "suggestedImprovements", "reportSummary"],
        additionalProperties: false
      }
    }
  }
});

   res.status(200).json({
         message: "Resume uploaded successfully",
        ai: JSON.parse(response.output_text),
   })

})

module.exports = {
    analyzeResumeWithJd
}