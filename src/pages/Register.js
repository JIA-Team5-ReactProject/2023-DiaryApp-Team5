import AuthForm from "../components/AuthForm";

function Register() {
  const handleRegister = () => {
    console.log("Register page");
  };

  return (
    <div className="mt-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">회원가입</h1>

        <p className="mt-4 text-gray-500">
          가입 후 자신만의 공간에서 하루의 기록을 시작해보세요.
        </p>
      </div>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}

export default Register;
