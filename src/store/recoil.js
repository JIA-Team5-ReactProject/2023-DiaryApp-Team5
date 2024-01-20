import { atom } from "recoil";

const loginState = atom({
  key: "login",
  default: !!localStorage.getItem('accessToken'),
});

const modalState = atom({
  key: "modal",
  default: false,
});

const searchState = atom({
  key: "search",
  default: [],
});

const s3UploadState = atom({
  key: 's3UploadState',
  default: {
    progress: 0,
    status: 'idle'
  },
});

export { loginState, modalState, searchState, s3UploadState };
