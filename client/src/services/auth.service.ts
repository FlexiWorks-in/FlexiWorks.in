import axios from "axios";
import { User } from "../types/api";

axios.defaults.withCredentials = true;

class AuthService {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      console.log(
        "AuthService :: login() :: Response: ",
        JSON.stringify(response.data.data.user)
      );
      return response.data;
    } catch (err: any) {
      throw err.response.data;
    }
  }

  async register(user: User) {
    console.log("AuthService :: register() :: User:   ", user);
    try {
      const response = await axios.post("/api/v1/user/register", user);
      console.log("AuthService :: register() :: Response: ", response.data);
      return response.data;
    } catch (err: any) {
      console.error("AuthService :: register() :: Error: ", err.response.data);
      throw err.response.data;
    }
  }

  async logout() {
    try {
      const response = await axios.get("/api/v1/user/logout", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("AuthService :: logout() :: Response: ", response.data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return response.data;
    } catch (err: any) {
      console.error("AuthService :: logout() :: Error: ", err.response.data);
      throw err.response.data;
    }
  }
}

const authService = new AuthService();

export default authService;
