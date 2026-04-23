import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ai-integrated-edtech-platform.onrender.com/', // Update with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export const generateAIResponse = async (prompt, mode) => {
  const response = await api.post('/api/ai/generate', { prompt, mode })
  return response.data
}