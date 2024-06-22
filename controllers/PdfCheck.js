const pdfParse = require('pdf-parse');


const extractTextAndCheck = (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        return res.status(400).send('No file uploaded.');
    }

    const pdfFile = req.files.pdfFile;

    pdfParse(pdfFile.data).then(result => {
        const extractedText = result.text;
        const containsKeyword = checkKeywords(extractedText);
        res.json({ extractedText, containsKeyword });
    }).catch(error => {
        console.error('Error parsing PDF:', error);
        res.status(500).send('Error parsing PDF.');
    });
};


const checkKeywords = (text) => {
    const lowercaseText = text.toLowerCase();
    return lowercaseText.includes('doctor') || lowercaseText.includes('physician') || lowercaseText.includes('clinic') || lowercaseText.includes('hospital');
};

module.exports = { extractTextAndCheck };
