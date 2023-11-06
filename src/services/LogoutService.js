import { useNavigate } from "react-router-dom";

function LogoutService() {
  const navigate = useNavigate();

  const logout = () => {
  // 로컬 스토리지 삭제
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
  navigate("/");
  }
  return logout;
}

export default LogoutService;
