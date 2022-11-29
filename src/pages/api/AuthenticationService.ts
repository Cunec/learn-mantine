import axios from "axios";
import { GetAccessToken, GetLocalHost } from "./BaseService";

/// 로그인.
export async function Signin(api : string, request : {}) {
  const response = axios.post(`${GetLocalHost()}${api}`, request)
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem(`${GetAccessToken()}`, response.data.token);
        // token이 존재하는 경우 Todo 화면으로 리디렉트
        //window.location.href = "/";

        return response.data.email;
      } else {
        return "Fail";
      }
    })

    return response;
}

/// 가입.
export async function Signup(api : string, request : {}) {
  const response = axios.post(`${GetLocalHost()}${api}`, request)
    .then((response) => {
      if (response.data.email) {
        console.log(response.data.email);
        
        //window.location.href = "/";
        return response.data.email;
      }
    })
  
  return response;
}

/// 로그아웃.
export function Logout() {
  localStorage.removeItem(`${GetAccessToken()}`);
}

/// 토큰 확인.
export async function CheckToken() {
  const accessToken = localStorage.getItem(`${GetAccessToken()}`);

  if (accessToken && accessToken !== null) {
    const response = axios.post(`${GetLocalHost()}/auth/detail`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return (await response).data;
  } else {
    return "null";
  }
}

// export async function Test(api : string, request : {}) {
//   const response = axios.post(`${GetLocalHost()}${api}`, request);
//   return (await response).data;
//   // return axios.post(`${GetLocalHost()}${api}`, request).then(response => response.data);
// }

// export const Test = async (api : string, request : {}) => {
//   try {
//     const {data:response} = await axios.post(`${GetLocalHost()}${api}`, request)
//     console.log("a", response);
//     return response;
    
//   } catch (error) {
//     console.log(error);
//   }
// }