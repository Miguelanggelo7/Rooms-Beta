import './menu.scss';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useUser } from '../../hooks/useUser';
import { signOut } from '../../api/auth';
import Divider from '@mui/material/Divider';

const Menu = (): JSX.Element => {

    const user = useUser()!;
  
    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: 400, position: 'relative', backgroundColor: '#f6f6f6', borderRight: '1px solid #e0e0e0' }} 
                elevation={0}
            >
                <Toolbar>
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{cursor: 'pointer'}} alt={user.name} src={user.image ? user.image : ""} />
                    </Stack>
                </Toolbar>
                <Toolbar>
                    <Stack direction="row" spacing={2}>
                        
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                width: 400,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 400, boxSizing: 'border-box' },
                }}
            >
                <Toolbar/>
                <Toolbar/>
                <Box sx={{ overflow: 'auto', border: 'none'}}>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <>
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <Avatar/>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                        ))}
                    </List>
                    <button onClick={signOut}>salir</button>
                </Box>
            </Drawer>
        </>
    );
  };
  
  export default Menu;