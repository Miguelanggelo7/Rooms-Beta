import { useState } from 'react';
import Chat from '../../components/Chat';
import Menu from '../../components/Menu';
import './home.scss';

const Home = (): JSX.Element => {

  const [userChat, setUserChat] = useState<string>("");

    return (
      <div className='container-home'>
        <Menu idUser={userChat} setId={setUserChat}/>
        <div className='container-chat'>
          <Chat idUser={userChat}/>
        </div>
      </div>
    );
  };
  
  export default Home;