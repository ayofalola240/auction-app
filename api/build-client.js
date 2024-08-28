// /api/build-client.js
import axios from "axios";
import https from "https";

export default (ctx) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


  const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Disables SSL certificate validation
  });

  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL,
      headers: ctx?.req?.headers,
      withCredentials: true,
      httpsAgent, 
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: "/api/v1",
      withCredentials: true,
      httpsAgent, 
    });
  }
};
