import axios from "axios";

//  at development => process.env.NEXT_PUBLIC_API_URL
//  at production => https://publishhouse.runasp.net/

const api = axios.create({
  baseURL: "https://publishhouse.runasp.net/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
