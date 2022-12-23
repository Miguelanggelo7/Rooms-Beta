import { Close } from '@mui/icons-material';
import { TextField, Dialog, useMediaQuery, Typography, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import './login.scss';
import FacebookIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from "framer-motion";
import { GoogleAuth, logIn, signUp } from '../../api/auth';
import { useSnackbar } from "notistack";
import { auth } from '../../api/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export interface LoginProps {
  open: boolean;
  setOpen: (open:boolean) => void;
}

interface ValuesSignUp {
  name: string;
  email: string;
  password: string;
}

const signUpData = {
  name: "",
  email: "",
  password: "",
};

interface ValuesLogIn {
  email: string;
  password: string;
}

const logInData = {
  email: "",
  password: "",
};

const Login = (props: LoginProps) => {

  const { enqueueSnackbar } = useSnackbar();

  const [userSignUp, setUserSignUp] = useState<ValuesSignUp>(signUpData);
  const [userLogIn, setUserLogIn] = useState<ValuesLogIn>(logInData);

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

  const handleChangeSignUp = (name: string, value: string) => {
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  const handleChangeLogIn = (name: string, value: string) => {
    setUserLogIn({ ...userLogIn, [name]: value });
  };

  const onSubmitSignUp = async (user: ValuesSignUp) => {
    const error = await signUp(user);

    if (error) {
      return enqueueSnackbar(error, { variant: "error" });
    }

    enqueueSnackbar("¡Bienvenido a Rooms!", { variant: "success" });
  };

  const onSubmitLogIn = async (user: ValuesLogIn) => {
    const error = await logIn(user);

    if (error) {
      return enqueueSnackbar(error, { variant: "error" });
    }

    enqueueSnackbar("¡Bienvenido de vuelta!", { variant: "success" });
  }

  return (
    <Dialog fullScreen={fullScreen} onClose={handleClose} open={open} PaperProps={{
      style : !fullScreen ? { borderRadius: '10px', padding: '20px', minWidth: '700pt' } : { padding: '0' }
    }}>
      <div className={`container${isContainerActive ? " right-panel-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <div className='form'>
            <div className='container-close-overlay-right'>
              <IconButton onClick={handleClose}>
                <Close sx={{color: "#010101"}}/>
              </IconButton>
            </div>
            <Typography variant='h4' sx={{color: "#010101"}}>Create Account</Typography>
            <div className="social-container">
              {/* <IconButton sx={socialIconStyle} >
                <FacebookIcon 
                  sx={{color: "#3b5998"}}
                />
              </IconButton> */}
              <IconButton sx={socialIconStyle} onClick={GoogleAuth}>
                <img style={{width: '20pt'}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"}/>
              </IconButton>
              {/* <IconButton sx={socialIconStyle} >
                <TwitterIcon 
                  sx={{color: "#00acee"}}
                />
              </IconButton>  */}
            </div>
            <Typography>or use your email for registration</Typography>
            <TextField onChange={(e) => handleChangeSignUp("name", e.target.value)} placeholder="Name" name="name" fullWidth sx={inputStyle}/>
            <TextField onChange={(e) => handleChangeSignUp("email", e.target.value)} placeholder="Email" name="email" type="email" fullWidth sx={inputStyle}/>
            <TextField onChange={(e) => handleChangeSignUp("password", e.target.value)} placeholder="Password" name="password" type="password" fullWidth sx={inputStyle}/>
            <a className='sign-up-link' onClick={() => setIsContainerActive(false)}>Already have an account? Sign in here</a>
            <motion.button 
              className="button-login" 
              whileHover={{scale: 1.05, backgroundColor: '#682bd7', color: "#fff"}}
              whileTap={{scale: 0.95}}
              onClick={() => onSubmitSignUp(userSignUp)}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
        <div className="form-container sign-in-container">
          <div className='form' >
            <div className='container-close-overlay-left'>
                <IconButton onClick={handleClose}>
                  <Close sx={{color: "#010101"}}/>
                </IconButton>
              </div>
              <Typography variant='h4' sx={{color: "#010101"}}>Sign in</Typography>
            <div className="social-container">
              {/* <IconButton sx={socialIconStyle} >
                <FacebookIcon 
                  sx={{color: "#3b5998"}}
                />
              </IconButton> */}
              <IconButton sx={socialIconStyle} onClick={GoogleAuth}>
                <img style={{width: '20pt'}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"}/>
              </IconButton>
              {/* <IconButton sx={socialIconStyle} >
                <TwitterIcon 
                  sx={{color: "#00acee"}}
                />
              </IconButton>  */}
            </div>
            <Typography>or use your account</Typography>
            <TextField onChange={(e) => handleChangeLogIn("email", e.target.value)} placeholder="Email" name="email" type="email" fullWidth sx={inputStyle}/>
            <TextField onChange={(e) => handleChangeLogIn("password", e.target.value)} placeholder="Password" name="password" type="password" fullWidth sx={inputStyle}/>
            <a className='sign-up-link' onClick={() => setIsContainerActive(true)}>Dont have an account? Sign up here</a>
            <motion.button 
              className="button-login" 
              whileHover={{scale: 1.05, backgroundColor: '#682bd7', color: "#fff"}}
              whileTap={{scale: 0.95}}
              onClick={() => onSubmitLogIn(userLogIn)}
            >
              Sign In
            </motion.button>
          </div>
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
  