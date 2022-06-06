import axios from "axios";

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

class AuthController {
  constructor() {
    this.auth = auth;
  }

  login() {
    return console.log("hello");
  }
}

export default AuthController;
