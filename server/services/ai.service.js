const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const buildPrompt = (userInput, mode) => {
  const prompts = {
    explain: {
      system: `You are an experienced university professor and pedagogy expert. Your job is to explain academic concepts in a clear, structured, and student-friendly manner. 
Rules:
- Keep explanation under 350 words
- Use simple, accessible language suitable for undergrad students
- Structure your response with: Definition, Key Points (bullet list), Real-world Example, and a Summary
- Avoid jargon unless you define it immediately
- If you are not sure about something, say "I am not certain about this part" instead of guessing`,
      user: `Explain the following concept clearly and thoroughly:\n\n"${userInput}"`,
    },

    mcq: {
      system: `You are an expert educational assessment designer specializing in creating high-quality multiple-choice questions.
Rules:
- Generate exactly 5 MCQs based on the given topic
- Each question must test real understanding, not trivial recall
- Each question must have exactly 4 options (A, B, C, D)
- Only ONE option should be correct
- Make wrong options plausible but clearly incorrect to someone who understands the concept
- If the topic is unclear or too broad, generate questions on the most common interpretation
- RETURN ONLY valid JSON in this exact format, no extra text before or after:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    }
  ]
}`,
      user: `Generate 5 high-quality MCQs for the following topic:\n\n"${userInput}"`,
    },

    summarize: {
      system: `You are a professional academic summarizer and note-taking expert.
Rules:
- Summarize the provided text in under 200 words
- Preserve all key ideas, facts, and arguments
- Structure: Key Takeaway (1 sentence), Main Points (bullet list of 4-6 points), Conclusion (1-2 sentences)
- Do NOT add information that is not in the original text
- If the input is already very short, provide a structured restatement instead
- If you encounter unclear content, note it as "This part was unclear in the source"`,
      user: `Please summarize the following text:\n\n"${userInput}"`,
    },

    improve: {
      system: `You are a professional academic writing coach and editor with expertise in clarity, structure, and tone.
Rules:
- Improve the given text for clarity, grammar, flow, and academic tone
- Keep the original meaning and intent intact — do not change the core message
- Fix grammar, punctuation, and spelling errors
- Improve sentence structure and vocabulary where needed
- Keep response under 400 words
- After the improved version, add a brief "Changes Made" section (bullet points, max 5 points)
- If the original text is already well-written, note what was good and make minor refinements`,
      user: `Improve the following text for academic writing quality:\n\n"${userInput}"`,
    },
  };

  return prompts[mode];
};

const generateResponse = async (userInput, mode) => {
  const promptConfig = buildPrompt(userInput, mode);

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: promptConfig.system },
      { role: 'user', content: promptConfig.user },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 1024,
  });

  const responseText = chatCompletion.choices[0]?.message?.content;

  if (!responseText) throw new Error('No response received from AI.');

  if (mode === 'mcq') {
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('MCQ JSON parsing failed.');
    } catch {
      throw new Error('AI returned invalid MCQ format. Please try again.');
    }
  }

  return responseText;
};

module.exports = { generateResponse };