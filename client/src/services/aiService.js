import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const generateAIResponse = async (prompt, mode) => {
  const response = await api.post('/api/ai/generate', { prompt, mode })
  return response.data
}