# main.py
from fastapi import FastAPI, Request
import httpx

app = FastAPI()

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    model = body.get("model", "gpt-4o")
    messages = body.get("messages", [])

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.gapgpt.app/v1/chat/completions",
            headers={"Authorization": "Bearer sk-S5rOGsclcKTN9vdMMsx3fZ1bYXALVqBV0z8WebUcX668zia4"},
            json={"model": model, "messages": messages}
        )
    return response.json()
