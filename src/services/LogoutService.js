function LogoutService() {
  // 로컬 스토리지 삭제
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
}

export default LogoutService;
