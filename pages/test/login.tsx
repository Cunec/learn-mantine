import { Button, Input } from "@mantine/core";
import { useEffect } from "react";
import { Logout, Signin } from "../api/AuthenticationService";

export default function Login() {
  console.log("login");

  useEffect(() => {
  }, []);

  // async function fetchTest() {
    // const a = await axios.post(`http://localhost:8080/auth/signin`, {
    //     "username" : "abc",
    //     "email" : "a@a.com",
    //     "password" : "12345"
    //   })
    //   .then((response) => {
    //     if (response.data.token) {
    //       console.log(response.data.token);
    //       // 로컬 스토리지에 토큰 저장
    //       localStorage.setItem(`ACCESS_TOKEN`, response.data.token);
    //       // token이 존재하는 경우 Todo 화면으로 리디렉트
    //       window.location.href = "/";
    //     }
    //   })
  // }
  // fetchTest();

  async function Login() {
    Signin(`/auth/signin`, {
        "username" : "abc",
        "email" : "a@a.com",
        "password" : "12345"
      }
    );
  }


  return (
    <div>
      <Button onClick={() => Login()}>Log in</Button>
      <Button onClick={() => Logout()}>Logout</Button>
    </div>
  );
}