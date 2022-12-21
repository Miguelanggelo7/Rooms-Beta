import {useState, useEffect} from 'react';
import Login from '../Login';
import { motion } from "framer-motion";
import './welcome.scss';
import logo from '../../assets/roomslogo.png';
import banVideo from '../../assets/bannerVideo.mp4';
import { Fade, TextField } from '@mui/material';
import useScrollPosition from '../../hooks/useScrollPosition';

const Welcome = (): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  return (
    <div>
      <div className='welcome-banner'>
        <video playsInline autoPlay muted loop id="myVideo">
          <source src={banVideo} type="video/mp4"/>
        </video>
        <img src={logo} className="logo-banner"/>
        <motion.button 
          className="button-banner"
          onClick={() => setOpen(true)}
          whileHover={{scale: 1.05, backgroundColor: '#fff', color: "#010101"}}
          whileTap={{scale: 0.95}}
        >
          Sign In
        </motion.button>
        <Fade in={true} timeout={1000}>
          <div className='text-banner'>
            <p className='subtitle-banner'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
        </Fade>
      </div>
      <Fade in={scrollPosition > 500} timeout={1000}>
        <div className='block1'>
          .
        </div>
      </Fade>
      <Fade in={scrollPosition > 800} timeout={1000}>
        <div className='block2'>
          .
        </div>
      </Fade>
      <Login open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Welcome;
