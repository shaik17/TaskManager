import { BASE_URL } from '../config/constant';
import axios from "axios";

const baseUrl = BASE_URL();

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept every request to check if the access token is expired
axiosInstance.interceptors.request.use(
   (config)=> {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      const myLicense = localStorage.getItem("license")
      const libraryId = localStorage.getItem("libraryId")
      const clientid = localStorage.getItem("clientId")
    //  const SubscriptionKey = myuser.toObject().license[]
     
      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
        
        config.headers.licenseKey = `${myLicense}`;
        config.headers['x-libraryid'] = `${libraryId}`
        config.headers['x-clientid'] = `${clientid}`;

      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    console.log("ERROR RESPONSE:", error.response);
    return Promise.reject(error.response.data.message.toString());
  }
);

export default axiosInstance;