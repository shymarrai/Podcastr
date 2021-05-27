import axios from 'axios'

export const api = axios.create({
  baseURL: "https://server-json-podcastr.herokuapp.com/:31081"
})