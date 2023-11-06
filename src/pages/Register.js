import AuthForm from "../components/AuthForm";

function Register() {
  const handleRegister = () => {
    console.log("Register page");
  };

  return (
    <div className="font-extralight mt-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl sm:text-3xl">회원가입</h1>

        <p className="mt-4 text-gray-500">
          가입하여 나만의 일기를 작성하는 여정을 시작하세요.
        </p>
      </div>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}

export default Register;
