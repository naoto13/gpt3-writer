import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${req.body.userInput}`)

  const basePromptPrefix =
    `以下のタイトルで、ブログ記事を書いてください。
    ブログの投稿がトピックについて詳しく説明されており、ライターが調査を行ったことを示していることを確認してください。
    Title:`
  const finalPrompt =`${basePromptPrefix}${req.body.userInput}の長所と短所と応用例について`
  console.log(`finalPrompt: ${finalPrompt}`)

  // 渡すpromptに\nをつけないと、直後から始まってしまう
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${finalPrompt}\n`,
    temperature: 0.8,
    max_tokens: 1200,
  });

  // Get the output
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;