
// 닉네임: 2자 ~ 10자 특수문자 제외

const nicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;

export default nicknameRegex;