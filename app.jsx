// app.jsx
import { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [model, setModel] = useState("gpt-4o")
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    const res = await axios.post("http://localhost:8000/chat", {
      model,
      messages: newMessages
    })

    const reply = res.data.choices[0].message.content
    setMessages([...newMessages, { role: "assistant", content: reply }])
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">💬 چت با هوش مصنوعی</h1>
      <select value={model} onChange={e => setModel(e.target.value)} className="mb-4 p-2">
        <option value="gpt-4o">GPT-4o</option>
        <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
      </select>
      <div className="bg-white p-4 rounded shadow mb-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className="block p-2 rounded bg-gray-200">{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="پیام خود را بنویسید..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">ارسال</button>
    </div>
  )
}
