import { MoreVertOutlined } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography, Box } from '@mui/material';
import Lottie from 'react-lottie';
import animationChat from '../../assets/startChat.json';
import './chat.scss';

interface UserChat {
    idUser: string;
  }

const Chat = ({idUser}: UserChat): JSX.Element => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require('../../assets/startChat.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }
  
    return (
        <div>
            { idUser !== "" ? (
                <AppBar 
                    position="fixed" 
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, position: 'relative', backgroundColor: '#f6f6f6', borderBottom: '1px solid #e0e0e0' }} 
                    elevation={0}
                >
                    <Toolbar>
                        <Stack direction="row" spacing={2} sx={{position: 'relative', width: '100%', alignItems: 'center'}}>
                            <Avatar sx={{cursor: 'pointer'}}/>
                            <Typography sx={{color: '#000'}}>
                                {idUser}
                            </Typography>
                            <IconButton sx={{position: 'absolute', right: 0}}>
                                <MoreVertOutlined/>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
            ) : (
                <div className='container-empty'>
                    <div className='container-animation'>
                        <Box sx={{ width: "40%", mx: "auto", mt: '-20pt' }}>
                            <Lottie options={defaultOptions} loop />
                        </Box>
                        <Typography variant='h4' fontWeight={400} mb={2}>
                            Rooms Web
                        </Typography>
                        <Typography variant='body1' fontWeight={400}>
                            Envía y recibe mensajes desde cualquier parte del mundo. ¿Qué esperas para iniciar un chat?
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
  };
  
  export default Chat;