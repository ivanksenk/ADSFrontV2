import { useEffect} from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import UserLogin from './Components/AuthComponents/UserLogin/UserLogin';
import { MainPage } from './Components/MainPage/MainPage';

function App() {
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    tg.expand();
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route index Component={UserLogin}/>
      <Route path={'/main'} Component={MainPage}/>
    </Routes>
    </BrowserRouter>
   )
}

export default App
