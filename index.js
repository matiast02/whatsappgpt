const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


const client = new Client({
    qrTimeoutMs: 0
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    const text = message.body.toLowerCase();
    if (text.startsWith('ia')) {
        const prompt = text.split('ia')[1]
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.7,
          });
       
        console.log(response.data.choices)
        const gptResponse = response.data?.choices[0]?.text.trim();
        message.reply(gptResponse);
    }
});

client.initialize();
