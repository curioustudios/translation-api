//created by curioustudios in Kyiv, Ukraine
const express = require('express');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());

app.get('/translate', async (req, res) => {
  try {
    const { text, to } = req.query;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    if (!to) {
      return res.status(400).json({ error: 'Target language is required' });
    }

    const translation = await translate(text, { to });

    res.status(200).json({ translation: translation.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
