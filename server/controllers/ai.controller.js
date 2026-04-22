const aiService = require('../services/ai.service');

const generate = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    console.log('Received AI generation request:', { prompt, mode });

    if (!prompt || !mode) {
      return res.status(400).json({
        success: false,
        error: 'Prompt and mode are required.',
      });
    }

    if (prompt.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is too short. Please provide more detail.',
      });
    }

    const validModes = ['explain', 'mcq', 'summarize', 'improve'];
    if (!validModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        error: `Invalid mode. Choose from: ${validModes.join(', ')}`,
      });
    }

    const result = await aiService.generateResponse(prompt, mode);

    return res.status(200).json({
      success: true,
      mode,
      response: result,
    });
  } catch (error) {
    console.error('Controller Error:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error.',
    });
  }
};

module.exports = { generate };