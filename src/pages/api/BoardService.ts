import axios from "axios";
import { GetAccessToken, GetLocalHost } from "./BaseService";

export async function Create(api : string, request : {}) {
  const accessToken = localStorage.getItem(`${GetAccessToken()}`);
  
  const response = axios.post(`${GetLocalHost()}${api}`, request, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then((response) => {
    console.log(response.data);
  })

  return response;
}