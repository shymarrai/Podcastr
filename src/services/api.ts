import axios from 'axios'

export const api = axios.create({
  baseURL: "https://podcastr-n8cuucr9b-shymarrai.vercel.app:3333/"
})