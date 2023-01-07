import { useState } from 'react';
import Chat from '../../components/Chat';
import Menu from '../../components/Menu';
import { User } from '../../types';
import './home.scss';

const Home = (): JSX.Element => {

  const [userChat, setUserChat] = useState<User | null>(null);

  const [openProfileContact, setOpenProfileContact] = useState<boolean>(false);

    return (
      <div className='container-home'>
        <Menu idUser={userChat} setId={setUserChat} openProfileContact={openProfileContact} setOpenProfileContact={setOpenProfileContact}/>
        <div className='container-chat'>
          <Chat idUser={userChat} setOpenProfileContact={setOpenProfileContact}/>
        </div>
      </div>
    );
  };
  
  export default Home;