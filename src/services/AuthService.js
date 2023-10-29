import axios from "axios";

const REGISTER_URL = "http://localhost:3001/register";
const LOGIN_URL = "http://localhost:3001/login";

class AuthService {
  static async login(credentials) {
    try {
      const response = await axios.post(LOGIN_URL, credentials);

      const { data } = response;

      if (!data) {
        throw new Error("이메일 혹은 비밀번호가 틀렸습니다.");
      }
      
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("id", data.user.id);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async register(newUser) {
    try {
      const response = await axios.post(REGISTER_URL, newUser);
      return response.data; // 새로 생성된 유저 정보를 반환
    } catch (error) {
      // 오류 메시지 반환
      throw error;
    }
  }

  static async isEmailTaken(email) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );
      return response.data.length > 0; // 이메일이 이미 존재하는지 여부를 반환
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
