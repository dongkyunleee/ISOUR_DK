import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './project/Login/Login';
import SignUp from './project/SignUp/SignUp';
import Home from './project/HOME/Home';
import MemberInfo from './project/pages/MemberInfo';
import Main from './project/pages/Main';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/MemberInfo' element={<MemberInfo />} />
      </Routes>
    </Router>
  );
}

export default App;