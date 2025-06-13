import logo from '../../../assets/logo.png';

import '../auth.css'

interface UserLoginProps {
    
}

const UserLogin: React.FC<UserLoginProps> = () => {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe;
    console.log(user)
    if(!user.user){
        return(
            <h3>Откройте в телеграме</h3>
        )
    }
    return (
        <div className='load-container'>
            <img src={logo} className='splash_img'/>
        </div>
    );
};

export default UserLogin;