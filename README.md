# 🤖 AI Chatbot — Next.js + Gemini + MongoDB

A clean, full-stack AI chatbot built with **Next.js 16**, **Google Gemini**, **Vercel AI SDK**, and **MongoDB**.

The project provides a ChatGPT-style conversational experience with persistent chat history and chat management.

---

## ✨ Features

- 🤖 AI conversations powered by Google Gemini
- 💬 ChatGPT-style chat interface
- 🗂️ Multiple conversations
- 💾 Persistent chat history with MongoDB
- ➕ Create new chats
- ✏️ Rename conversations
- 🗑️ Delete individual chats
- 🧹 Clear all conversations
- 🔄 Conversations remain after page refresh
- 🛡️ API key kept server-side
- ⚡ Next.js App Router API routes
- 📱 Responsive UI
- 🚨 Error handling for API/database failures

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework |
| **React** | User interface |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling |
| **Google Gemini** | AI model |
| **Vercel AI SDK** | AI integration |
| **@ai-sdk/google** | Gemini provider |
| **MongoDB** | Persistent chat storage |
| **MongoDB Atlas** | Cloud database |
| **Git & GitHub** | Version control |
| **Vercel** | Deployment |

---

## 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Next.js UI    │
                    │  React + TS     │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
      ┌───────────────┐             ┌───────────────┐
      │  /api/chat    │             │  /api/chats   │
      └───────┬───────┘             └───────┬───────┘
              │                             │
              ▼                             ▼
      ┌───────────────┐             ┌───────────────┐
      │ Google Gemini │             │    MongoDB     │
      └───────────────┘             └───────────────┘
```

### Chat flow

```text
User
 ↓
Chat UI
 ↓
POST /api/chat
 ↓
Vercel AI SDK
 ↓
Google Gemini
 ↓
AI response
 ↓
MongoDB
 ↓
Chat history
```

---

## 📁 Project Structure

```text
ai-chatbot/
│
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts
│   │   │
│   │   └── chats/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatInput.tsx
│   │   └── MessageList.tsx
│   │
│   └── sidebar/
│       └── Sidebar.tsx
│
├── lib/
│   ├── db.ts
│   └── mongodb.ts
│
├── types/
│   └── chat.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

> File names may differ slightly depending on your final project structure.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a file named:

```text
.env.local
```

Add:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key |
| `MONGODB_URI` | MongoDB connection string |

### ⚠️ Security

Never commit `.env.local` to GitHub.

Make sure your `.gitignore` contains:

```gitignore
.env*
!.env.example
```

Never expose your Gemini API key in:

- Client-side React code
- Public environment variables
- GitHub
- Console logs
- Screenshots

---

## 🗄️ MongoDB Setup

This project uses MongoDB for storing conversations.

Create a MongoDB Atlas project and database, then copy your connection string.

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-chatbot
```

The application stores chat documents containing information such as:

```json
{
  "title": "My Chat",
  "messages": [
    {
      "id": "message-id",
      "role": "user",
      "content": "Hello"
    },
    {
      "id": "message-id",
      "role": "assistant",
      "content": "Hello! How can I help?"
    }
  ]
}
```

---

## 🤖 Gemini Configuration

The backend uses the Google provider from the Vercel AI SDK.

Example:

```ts
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const result = await generateText({
  model: google("gemini-3.6-flash"),
  messages,
});
```

The API key is accessed only on the server.

---

## 🔌 API Endpoints

### AI Chat

```http
POST /api/chat
```

Request:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello"
    }
  ]
}
```

Successful response:

```json
{
  "message": "Hello! How can I help you?"
}
```

---

### Get all chats

```http
GET /api/chats
```

---

### Create a chat

```http
POST /api/chats
```

---

### Get one chat

```http
GET /api/chats/:id
```

---

### Update a chat

```http
PUT /api/chats/:id
```

Example:

```json
{
  "title": "Next.js Learning"
}
```

---

### Delete a chat

```http
DELETE /api/chats/:id
```

---

### Delete all chats

```http
DELETE /api/chats
```

---

## 🧪 Testing with Postman

You can test the AI endpoint directly:

```text
POST http://localhost:3000/api/chat
```

Body:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain Next.js in simple words."
    }
  ]
}
```

Expected:

```json
{
  "message": "..."
}
```

---

## 📦 Useful Commands

Start development:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Start production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

---

## 🌐 Deployment

The application can be deployed on **Vercel**.

High-level process:

```text
GitHub Repository
       ↓
     Vercel
       ↓
Add Environment Variables
       ↓
     Deploy
       ↓
Live AI Chatbot
```

Required production variables:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

Make sure MongoDB Atlas allows the deployed application to connect.

---

## 🔒 Production Considerations

Before using this application for a large number of users, consider adding:

- User authentication
- Per-user chat authorization
- API rate limiting
- Request validation
- Abuse protection
- Better AI streaming
- Usage monitoring
- Error monitoring
- MongoDB indexes
- More granular database permissions
- Production-safe Gemini API credentials

---

## 🛣️ Roadmap

### Completed

- [x] Next.js chatbot UI
- [x] Gemini integration
- [x] API route
- [x] MongoDB integration
- [x] Persistent conversations
- [x] Create chat
- [x] Rename chat
- [x] Delete chat
- [x] Clear conversations
- [x] Error handling
- [x] GitHub setup

### Planned

- [ ] User authentication
- [ ] Per-user conversations
- [ ] Real-time AI streaming
- [ ] Markdown rendering
- [ ] Syntax-highlighted code blocks
- [ ] Copy code button
- [ ] Regenerate response
- [ ] Edit messages
- [ ] Better mobile UI
- [ ] Dark/light theme
- [ ] Rate limiting
- [ ] Usage tracking
- [ ] Production monitoring

---

## 📸 Screenshots

![alt text](image.png)

---

## 💡 What I Learned

This project demonstrates practical experience with:

- Next.js App Router
- React component architecture
- TypeScript
- REST API routes
- AI API integration
- Google Gemini
- Vercel AI SDK
- MongoDB CRUD operations
- Environment variables
- API error handling
- Git/GitHub workflow
- Vercel deployment

---

## 👨‍💻 Author

**Adarsh Sharma**

Built as a full-stack AI chatbot project using modern web technologies.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is available for learning and personal portfolio use.

