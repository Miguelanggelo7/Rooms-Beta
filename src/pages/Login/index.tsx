import { Close } from '@mui/icons-material';
import { TextField, Dialog, useMediaQuery, Typography, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import './login.scss';
import FacebookIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from "framer-motion";

export interface LoginProps {
  open: boolean;
  setOpen: (open:boolean) => void;
}

const Login = (props: LoginProps) => {

  const { setOpen, open } = props;

  const [isContainerActive, setIsContainerActive] = useState<boolean>(false);

  const inputStyle = {
    marginTop: '5pt',
    marginBottom: '5pt'
  }

  const socialIconStyle = {
    border: '2px solid #010101', 
    marginLeft: '10pt',
    marginRight: '10pt',
  }

  const fullScreen = useMediaQuery("(max-width:950px)");


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen={fullScreen} onClose={handleClose} open={open} PaperProps={{
      style : !fullScreen ? { borderRadius: '10px', padding: '20px', minWidth: '700pt' } : { padding: '0' }
    }}>
      <div className={`container${isContainerActive ? " right-panel-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <div className='container-close-overlay-right'>
              <IconButton onClick={handleClose}>
                <Close sx={{color: "#010101"}}/>
              </IconButton>
            </div>
            <Typography variant='h4' sx={{color: "#010101"}}>Create Account</Typography>
            <div className="social-container">
              <IconButton sx={socialIconStyle} >
                <FacebookIcon 
                  sx={{color: "#3b5998"}}
                />
              </IconButton>
              <IconButton sx={socialIconStyle} >
                <GoogleIcon 
                  sx={{color: "#ea4335"}}
                />
              </IconButton>
              <IconButton sx={socialIconStyle} >
                <TwitterIcon 
                  sx={{color: "#00acee"}}
                />
              </IconButton> 
            </div>
            <Typography>or use your email for registration</Typography>
            <TextField placeholder="Name" name="name" fullWidth sx={inputStyle}/>
            <TextField placeholder="Email" name="email" type="email" fullWidth sx={inputStyle}/>
            <TextField placeholder="Password" name="password" type="password" fullWidth sx={inputStyle}/>
            <a className='sign-up-link' onClick={() => setIsContainerActive(false)}>Already have an account? Sign in here</a>
            <motion.button 
              className="button-login" 
              whileHover={{scale: 1.05, backgroundColor: '#682bd7', color: "#fff"}}
              whileTap={{scale: 0.95}}
            >
              Sign Up
            </motion.button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <div className='container-close-overlay-left'>
                <IconButton onClick={handleClose}>
                  <Close sx={{color: "#010101"}}/>
                </IconButton>
              </div>
              <Typography variant='h4' sx={{color: "#010101"}}>Sign in</Typography>
            <div className="social-container">
              <IconButton sx={socialIconStyle} >
                <FacebookIcon 
                  sx={{color: "#3b5998"}}
                />
              </IconButton>
              <IconButton sx={socialIconStyle} >
                <GoogleIcon 
                  sx={{color: "#ea4335"}}
                />
              </IconButton>
              <IconButton sx={socialIconStyle} >
                <TwitterIcon 
                  sx={{color: "#00acee"}}
                />
              </IconButton> 
            </div>
            <Typography>or use your account</Typography>
            <TextField placeholder="Email" name="email" type="email" fullWidth sx={inputStyle}/>
            <TextField placeholder="Password" name="password" type="password" fullWidth sx={inputStyle}/>
            <a className='sign-up-link' onClick={() => setIsContainerActive(true)}>Dont have an account? Sign up here</a>
            <motion.button 
              className="button-login" 
              whileHover={{scale: 1.05, backgroundColor: '#682bd7', color: "#fff"}}
              whileTap={{scale: 0.95}}
            >
              Sign In
            </motion.button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Typography variant='h3' sx={{color: '#fff', marginTop: '-100pt', marginBottom: '20pt'}}>Welcome Back!</Typography>
              <Typography sx={{color: '#fff'}}>To keep connected with us please login with your personal details</Typography>
              <motion.button 
                className="button-login ghost" id="signIn" 
                onClick={() => setIsContainerActive(false)}
                whileHover={{scale: 1.05, backgroundColor: '#fff', color: "#010101"}}
                whileTap={{scale: 0.95}}
              >
                Sign In
              </motion.button>
            </div>
            <div className="overlay-panel overlay-right">
            <Typography variant='h3' sx={{color: '#fff', marginTop: '-100pt', marginBottom: '20pt'}}>Hi There!</Typography>
              <Typography sx={{color: '#fff'}}>Enter your personal details to open an account with us</Typography>
              <motion.button 
                className="button-login ghost" id="signUp" 
                onClick={() => setIsContainerActive(true)}
                whileHover={{scale: 1.05, backgroundColor: '#fff', color: "#010101"}}
                whileTap={{scale: 0.95}}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </div>
      </div>    
    </Dialog>
  );
};
  
export default Login;
  