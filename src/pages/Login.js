import AuthForm from "../components/AuthForm";

function Login() {
  const handleLogin = () => {
    console.log("login page");
  };

  return (
    <div className="mt-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">로그인</h1>

        <p className="mt-4 text-gray-500">
          로그인하고 나만의 일기를 작성하는 여정을 시작하세요.
        </p>
      </div>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}

export default Login;
