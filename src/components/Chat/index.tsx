import { MoreVertOutlined } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import './chat.scss';

interface UserChat {
    idUser: string;
  }

const Chat = ({idUser}: UserChat): JSX.Element => {
  
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
                <Typography textAlign={"center"}>
                    Inicia un chat
                </Typography>
            )}
        </div>
    );
  };
  
  export default Chat;