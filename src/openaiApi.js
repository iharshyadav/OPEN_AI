import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration ({ apiKey:"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"})
const openai = new OpenAIApi (configuration);


export async function sendMsgToOpenAI (message) {
    try {
        const res = await openai.createCompletion({
          engine: 'gpt-3.5-turbo',
          prompt: message,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(res.data.choices[0].message.content);
        return res.data.choices[0].message.content;
      } catch (error) {
        console.error('OpenAI API request failed:', error.message);
        throw error; 
      }
}