# chat-backend

Serverless Lambda proxy that lets you call **OpenAI** and **Anthropic (Claude)**
from a single `/chat` endpoint.

## Deploy

```bash
npm install
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
serverless deploy --stage prod
```

After deployment you'll get an HTTPS URL like:

```
https://abc123.execute-api.ap-southeast-1.amazonaws.com/chat
```

## Request body

```json
{
  "provider": "openai",
  "model": "gpt-3.5-turbo",
  "messages": [{"role":"user","content":"Hello"}]
}
```

## License

MIT
