import axios from "axios";

const AIRTABLE_API_URL = import.meta.env.VITE_AIRTABLE_API_URL;
const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

export const airtableClient = axios.create({
  baseURL: AIRTABLE_API_URL,
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Interceptor para logs de erro
airtableClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Airtable API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
