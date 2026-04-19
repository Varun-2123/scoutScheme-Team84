const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.fetchSchemes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user.profileDone) {
      return res.status(400).json({ message: 'Please complete your profile first' });
    }

    const prompt = `
      You are a government scheme advisor for India.
      
      A user has the following profile:
      - Name: ${user.name}
      - Age: ${user.age}
      - Gender: ${user.gender}
      - State: ${user.state}
      - Occupation: ${user.occupation}
      - Annual Income: ₹${user.annualIncome}
      - Category: ${user.category}

      List all central and state government schemes this person is eligible for.
      
      For each scheme return a JSON array where every item has these fields:
      - name (string)
      - description (string, 2-3 lines)
      - level (either "Central" or "State")
      - applyLink (official URL)
      - deadline (string or null)
      - steps (array of strings, step by step guide to apply)
      - tags (array of strings)

      Return ONLY the raw JSON array. No explanation, no markdown, no backticks.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const schemes = JSON.parse(text);

    await User.findByIdAndUpdate(req.user.id, { savedSchemes: schemes });

    res.json({ count: schemes.length, schemes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getSavedSchemes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.savedSchemes || user.savedSchemes.length === 0) {
      return res.status(404).json({ message: 'No saved schemes. Please fetch first.' });
    }
    res.json({ count: user.savedSchemes.length, schemes: user.savedSchemes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};