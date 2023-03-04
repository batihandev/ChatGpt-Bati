import openai from "./chatgpt";
//with chat id u can return previous messages?
const query = async (
  prompt: string,
  chatId: string,
  model: string,
  chatGpt: boolean,
  messages: any
) => {
  if (chatGpt) {
    const res = await openai
      .createChatCompletion({
        model,
        messages,
      })
      .then((res) => res.data?.choices[0]?.message?.content)
      .catch(
        (err) =>
          `ChatGPT was unable to find an answer for that! (Error:${err.message})`
      );
    return res;
  } else {
    const res = await openai
      .createCompletion({
        model,
        prompt,
        temperature: 0.9,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => res.data.choices[0].text)
      .catch(
        (err) =>
          `ChatGPT was unable to find an answer for that! (Error:${err.message})`
      );
    return res;
  }
};

export default query;
