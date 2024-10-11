import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.wikimedia.org/feed/v1/wikipedia/',
});
