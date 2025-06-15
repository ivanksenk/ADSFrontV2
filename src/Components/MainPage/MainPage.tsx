import { CreateAd } from "../CreateAd/CreateAd";


interface MainPageProps {
    
}

export const MainPage: React.FC<MainPageProps> = () => {
    return (
        <div className="container">
            <CreateAd/>
        </div>
    );
};

