function Login() {
  return (
    <div className="bg-sky-500/50 fixed inset-0 flex">
      <div className="flex-1"></div>
      <div className="flex-1 flex">
        <div className="flex-auto place-self-center">
          <div className="bg-white h-96 w-80 p-10">
            <h1>로그인</h1>
            <input type="text" placeholder="Id" />
            <input type="password" placeholder="password" />
            <div></div>
            <button>로그인</button>
          </div>
        </div>
        <div className="flex-auto"></div>
      </div>
    </div>
  );
}

export default Login;
