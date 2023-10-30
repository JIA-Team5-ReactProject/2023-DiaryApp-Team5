import Main from "./pages/Main";
import Every from "./pages/Every";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Me from "./pages/Me";
import MyPage from "./pages/MyPage";
import { useRecoilState } from "recoil";
import { modalState } from "./store/recoil";
import DiaryModal from "./components/DiaryModal";
import Write from "./pages/Write";

function App() {
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <div>
      {modal ? <DiaryModal /> : <></>}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/every" element={<Every />} />
        <Route path="/me" element={<Me />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/write" element={<Write/>}/>
      </Routes>
    </div>
  );
}

export default App;
