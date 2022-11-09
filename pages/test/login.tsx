import axios from "axios";
import { useEffect } from "react";
import axiosCall from "../api/ApiService2";

export default function Login() {
  console.log("login");

  useEffect(() => {
  }, []);

  async function fetchTest() {
    // await axios.post(`http://localhost:8080/auth/signin`)
    //   .then(response => {
    //     console.log("?", response.data);
    //   });
    // const a = axiosCall("/auth/signin", "POST",
    // {
    //   "username" : "abc",
    //   "email" : "a@a.com",
    //   "password" : "12345"
    // });

    const a = await axios.post(`http://localhost:8080/auth/signin`, {
        "username" : "abc",
        "email" : "a@a.com",
        "password" : "12345"
      })
      .then((response) => {
        if (response.data.token) {
          // 로컬 스토리지에 토큰 저장
          localStorage.setItem(`ACCESS_TOKEN`, response.data.token);
          // token이 존재하는 경우 Todo 화면으로 리디렉트
          window.location.href = "/";
        }
        console.log(response.data.token);
      })
  }

  fetchTest();

  return (
    <div>
      Log in Test.
    </div>
  );
}