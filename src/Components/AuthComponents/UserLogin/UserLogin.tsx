// import { myAxiosForAuth } from '../../../API/config';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router';

import '../auth.css'

interface UserLoginProps {

}

const UserLogin: React.FC<UserLoginProps> = () => {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe.user;
    const navigate = useNavigate();
    console.log(user)
    if (!user) {
        return (
            <h3>Откройте в телеграме</h3>
        )
    }
    setTimeout(() => {
        navigate('/main')
    }, 800)


    // const userData = {
    //     idUser: user.id
    // }
    // myAxiosForAuth.post('/users/login',userData)

    return (
        <div className='load-container'>
            <img src={logo} className='splash_img' />
        </div>
    );
};

export default UserLogin;