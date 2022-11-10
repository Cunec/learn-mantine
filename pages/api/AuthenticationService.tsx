import axios from "axios";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const LOCAL_HOST = `http://localhost:8080`

export function Signin(api : string, request : {}) {
  axios.post(`${LOCAL_HOST}${api}`, request)
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem(`ACCESS_TOKEN`, response.data.token);
        // token이 존재하는 경우 Todo 화면으로 리디렉트
        window.location.href = "/";
      }
    })
}

export function Logout() {

  localStorage.removeItem(ACCESS_TOKEN);

  window.location.href = "/";
}

export function Test() {
  console.log("hello?");
}

export const Test2 = () => {
  console.log("Test2..");
}