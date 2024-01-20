import SetAccout from "../components/SetAccount";

function Account() {
  return (
    <div className="font-extralight mt-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl sm:text-3xl">개인정보 수정</h1>

        <p className="mt-4 text-gray-500">
          비밀번호 변경 및 탈퇴가 가능합니다.
        </p>
      </div>
      <SetAccout />
    </div>
  );
}

export default Account;
