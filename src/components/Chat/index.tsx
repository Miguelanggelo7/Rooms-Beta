import { Mic, MoreVertOutlined, Send } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography, Box, TextField } from '@mui/material';
import Lottie from 'react-lottie';
import './chat.scss';
import { useEffect, useState } from "react";
import { User } from '../../types';

interface UserChat {
    idUser: User | null;
    setOpenProfileContact: (value: boolean) => void;
  }

const Chat = ({idUser, setOpenProfileContact}: UserChat): JSX.Element => {

    useEffect(() => {
        setMessage('');
    }, [idUser])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require('../../assets/startChat.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }

      const [message, setMessage] = useState<string>('');
  
    return (
        <div>
            { idUser ? (
                <div className='cont-chat'>
                    <AppBar 
                        position="fixed" 
                        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, position: 'relative', backgroundColor: '#f6f6f6', borderBottom: '1px solid #e0e0e0' }} 
                        elevation={0}
                    >
                        <Toolbar>
                            <Stack direction="row" spacing={2} sx={{position: 'relative', width: '100%', alignItems: 'center', color: '#010101'}}>
                                <Avatar sx={{cursor: 'pointer'}} src={idUser?.image} onClick={() => setOpenProfileContact(true)}/>
                                <Typography>
                                    {idUser?.name}
                                </Typography>
                                <IconButton sx={{position: 'absolute', right: 0}}>
                                    <MoreVertOutlined/>
                                </IconButton>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                    <div className='cont-messages'>
                        {/* Aca los mensajes */}
                    </div>
                    <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
                        <AppBar 
                            position='fixed'
                            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#f6f6f6', borderBottom: '1px solid #e0e0e0', position: 'relative' }} 
                            elevation={0}
                        >
                            <Toolbar sx={{color: '#010101'}}>
                                <Stack direction="row" spacing={2} sx={{position: 'relative', width: '100%', alignItems: 'center'}}>
                                    <TextField 
                                        autoComplete='off'
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        placeholder='Escribe un mensaje aquí'
                                        variant="standard"
                                        size='small' 
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: '5px',
                                            width: '100%',
                                            padding: '3pt',
                                            transition: 'all .5s'
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            style: {
                                                paddingTop: '3pt',
                                                paddingLeft: '15pt',
                                            },
                                        }}
                                    />
                                    {message !== '' ? (
                                        <IconButton>
                                            <Send/>
                                        </IconButton>
                                    ) : (
                                        <IconButton>
                                            <Mic/>
                                        </IconButton>
                                    )}
                                </Stack>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
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