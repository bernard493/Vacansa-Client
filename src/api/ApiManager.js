import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://172.20.10.6:5001/api", //change this to your api url
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
