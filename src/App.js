import Main from "./pages/Main";
import Every from "./pages/Every";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Me from "./pages/Me";
import MyPage from "./pages/MyPage";
import Diary from "./pages/Diary";
import Register from "./pages/Register";
import Login from "./pages/Login";


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
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
