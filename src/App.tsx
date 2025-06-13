import { useEffect} from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import UserLogin from './Components/AuthComponents/UserLogin/UserLogin';

function App() {
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    tg.expand();
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route index Component={UserLogin}/>
    </Routes>
    </BrowserRouter>
   )
}

export default App
