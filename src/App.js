import Main from "./pages/Main";
import Every from "./pages/Every";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Me from "./pages/Me";
import MyPage from "./pages/MyPage";
import Diary from "./pages/Diary";


function App() {
  
  return (
    <div>
      {/* {modal ? <DiaryModal /> : <></>} */}
      <Header />
      <Routes>
        <Route path="/diary" element={<Diary />} />
        <Route path="/" element={<Main />} />
        <Route path="/every" element={<Every />} />
        <Route path="/me" element={<Me />} />
        <Route path="/myPage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
