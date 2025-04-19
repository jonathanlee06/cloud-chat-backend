import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const handler = async (event) => {
  const { provider, model, messages } = JSON.parse(event.body || "{}");

  let reply;
  if (provider === "openai") {
    const res = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages
    });
    reply = res.choices[0].message.content;
  } else if (provider === "anthropic") {
    const res = await anthropic.messages.create({
      model: model || "claude-3-7-sonnet-20250219",
      messages,
      max_tokens: 1024
    });
    reply = res.content[0].text;
  } else {
    return { statusCode: 400, body: "Unknown provider" };
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ reply })
  };
};
