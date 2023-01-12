import { Mic, MoreVertOutlined, Send } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography, Box, TextField } from '@mui/material';
import Lottie from 'react-lottie';
import './chat.scss';
import { useEffect, useState, Fragment } from "react";
import { User } from '../../types';
import { FormattedMessage, useIntl } from 'react-intl'; 
import { handleSendMessage } from '../../api/chat';
import { useUser } from '../../hooks/useUser';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../api/config';
import Message from '../Message';

interface UserChat {
    idUser: User | null;
    setOpenProfileContact: (value: boolean) => void;
  }

const Chat = ({idUser, setOpenProfileContact}: UserChat): JSX.Element => {

    const user = useUser()!;

    const [chat, setChat] = useState();

    function padTo2Digits(num: any) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date: any) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }

    const [datesMessages, setDatesMessages] = useState([]);

    const isNewDate = (date: any) => {
        //@ts-ignore
        if (datesMessages.includes(formatDate(date.toDate()))) {
            return false;
        } else {
            //@ts-ignore
            setDatesMessages([...datesMessages, formatDate(date.toDate())])
        }
    }

    useEffect(() => {
        setMessage('');
        setDatesMessages([]);
        
        const getChat = () => {
            //@ts-ignore
           const unsub = onSnapshot(doc(db, "chats", user.id > idUser?.id ? user.id + idUser?.id  : idUser?.id  + user.id), (doc) => {
                //@ts-ignore
                setChat(doc.data());
            });

            return () => {
                unsub();
            };
        };

        idUser && getChat();
    
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

      const intl = useIntl();
  
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
                                <Avatar imgProps={{ referrerPolicy: "no-referrer" }} sx={{cursor: 'pointer'}} src={idUser?.image} onClick={() => setOpenProfileContact(true)}/>
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
                        {/* @ts-ignore */}
                        {chat && chat?.messages.map((message, index) => (
                            <div key={index + ""} style={ user.id === message.userId ? { alignSelf: 'flex-start', maxWidth: '40%'} : { alignSelf: 'flex-end', maxWidth: '40%'}}>
                                <Message message={message}/>
                            </div>
                        ))}
                    </div>
                    <div style={{backgroundColor: '#efeae2', height: '30pt', marginTop: '-15pt'}}/>
                    <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
                        <AppBar 
                            position='fixed'
                            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#f6f6f6', borderTop: '1px solid #e0e0e0', position: 'relative' }} 
                            elevation={0}
                        >
                            <Toolbar sx={{color: '#010101'}}>
                                <Stack direction="row" spacing={2} sx={{position: 'relative', width: '100%', alignItems: 'center'}}>
                                    <TextField 
                                        autoComplete='off'
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        placeholder={intl.formatMessage({id: 'typeMessage'})}
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
                                        <IconButton onClick={
                                            () => {
                                                handleSendMessage(user, idUser, message);
                                                setMessage("");
                                            }
                                        }>
                                            <Send/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => console.log(chat)}>
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
                            <FormattedMessage 
                                id="roomsWebDescription"
                                defaultMessage="Send and receive messages from anywhere. What are you waiting for to start a chat?"
                            />
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
  };
  
  export default Chat;