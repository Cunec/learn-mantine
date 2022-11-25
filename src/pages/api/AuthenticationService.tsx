import axios from "axios";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const LOCAL_HOST = `http://localhost:8080`

export async function Signin(api : string, request : {}) {
  const response = axios.post(`${LOCAL_HOST}${api}`, request)
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem(`ACCESS_TOKEN`, response.data.token);
        // token이 존재하는 경우 Todo 화면으로 리디렉트
        //window.location.href = "/";

        return response.data.email;
      } else {
        return "Fail";
      }
    })

    return response;
}

export async function Signup(api : string, request : {}) {
  const response = axios.post(`${LOCAL_HOST}${api}`, request)
    .then((response) => {
      if (response.data.email) {
        console.log(response.data.email);
        
        //window.location.href = "/";
        return response.data.email;
      }
    })
  
  return response;
}


export function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);

  //window.location.href = "/";
}

export async function CheckToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken && accessToken !== null) {
    const response = axios.post(`${LOCAL_HOST}/auth/detail`, {}, {
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
//   const response = axios.post(`${LOCAL_HOST}${api}`, request);
//   return (await response).data;
//   // return axios.post(`${LOCAL_HOST}${api}`, request).then(response => response.data);
// }

// export const Test = async (api : string, request : {}) => {
//   try {
//     const {data:response} = await axios.post(`${LOCAL_HOST}${api}`, request)
//     console.log("a", response);
//     return response;
    
//   } catch (error) {
//     console.log(error);
//   }
// }