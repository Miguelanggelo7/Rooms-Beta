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
import { useUser } from '../../hooks/useUser';
import { signOut } from '../../api/auth';
import Divider from '@mui/material/Divider';
import { Badge, IconButton, InputAdornment, Popover, TextField, Typography, Tooltip } from '@mui/material';
import { Clear, FilterList, Chat, MoreVertOutlined, Search } from '@mui/icons-material';
import { useState } from 'react';
import ProfileDrawer from '../ProfileDrawer';
import { User } from '../../types';
import AddContactDialog from '../AddContactDialog';
import ProfileContactDrawer from '../ProfileContactDrawer';

interface UserChat {
    idUser: User | null;
    setId: (value: User | null) => void;
    openProfileContact: boolean;
    setOpenProfileContact: (value: boolean) => void;
  }

const Menu = ({idUser, setId, openProfileContact, setOpenProfileContact}: UserChat): JSX.Element => {

    const user = useUser()!;

    const [onFocusInput, setOnFocusInput] = useState<boolean>(false);

    const [filterWithoutRead, setFilterWithoutRead] = useState<boolean>(false);

    const [filterChat, setFilterChat] = useState<string>("");

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const [openDrawerProfile, setOpenDrawerProfile] = useState<boolean>(false);

    const [openDialogContact, setOpenDialogContact] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
  
    return (
        <>
            <ProfileDrawer
                open={openDrawerProfile}
                onOpen={() => setOpenDrawerProfile(true)}
                onClose={() => setOpenDrawerProfile(false)}
            />
            <ProfileContactDrawer 
                open={openProfileContact}
                onOpen={() => setOpenProfileContact(true)}
                onClose={() => setOpenProfileContact(false)}
                user={idUser}
            />
            <AddContactDialog 
                open={openDialogContact}
                onClose={() => setOpenDialogContact(false)}
                setId={setId}
            />
            <AppBar 
                position="fixed" 
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: 400, position: 'relative', backgroundColor: '#f6f6f6', borderRight: '1px solid #e0e0e0' }} 
                elevation={0}
            >
                <Toolbar>
                    <Stack direction="row" spacing={2} sx={{position: 'relative', width: '100%'}}>
                        <Avatar sx={{cursor: 'pointer'}} src={user.image ? user.image : ""} onClick={() => setOpenDrawerProfile(true)} />
                        <Tooltip title="Nuevo chat">
                            <IconButton sx={{position: 'absolute', right: 50}} onClick={() => setOpenDialogContact(true)}>
                                <Chat/>
                            </IconButton>
                        </Tooltip>
                        <IconButton aria-describedby={id} onClick={handleClick} sx={{position: 'absolute', right: 0}}>
                            <MoreVertOutlined/>
                        </IconButton>
                    </Stack>
                </Toolbar>
                <Popover
                    id={id}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    >
                        <List>
                            <ListItem  
                                disablePadding 
                                dense
                            >
                                <ListItemButton onClick={signOut}>
                                    <ListItemText primary={"Cerrar sesión"}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                </Popover>
                <Toolbar sx={{boxShadow: onFocusInput ? '0 4px 2px -2px rgba(0,0,0,0.1)' : '', transition: 'all .3s', backgroundColor: '#fff', borderTop: '1px solid #dcdcdc', borderBottom: '1px solid #dcdcdc'}}>
                    <Stack direction="row" spacing={2} justifyContent="center" >
                        <TextField 
                            autoComplete='off'
                            onFocus={() => setOnFocusInput(true)}
                            onBlur={() => setOnFocusInput(false)}
                            placeholder='Busca un chat'
                            variant="standard"
                            value={filterChat}
                            onChange={e => setFilterChat(e.target.value)}
                            size='small' 
                            sx={{
                                backgroundColor: '#f6f6f6',
                                borderRadius: '5px',
                                width: '238pt',
                            }}
                            InputProps={{
                                disableUnderline: true,
                                style: {
                                    fontSize: "10pt",
                                    paddingTop: '3pt',
                                    paddingLeft: '10pt',
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search fontSize='small' sx={{marginTop: '-2px', marginRight: '15pt', transition: 'all .3s', color: onFocusInput ? "#682bd7" : ""}}/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        { filterChat && <Clear onClick={() => setFilterChat("")} fontSize='small' sx={{cursor: 'pointer', marginRight: '5pt', marginTop: '-2px'}}/>}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton sx={{transition: 'all .3s' ,backgroundColor: filterWithoutRead ? "#a37cf0" : "", '&:hover' : {backgroundColor: filterWithoutRead ? "#a37cf0" : ""}}} onClick={() => setFilterWithoutRead(!filterWithoutRead)} size='small'>
                            <FilterList sx={{ color: filterWithoutRead ? "#fff" : "" }} fontSize='small'/>
                        </IconButton>
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
                <Box sx={{ overflow: 'auto', border: 'none', marginTop: '-8px'}}>
                    {/* <List>
                        {['Jose', 'Juan', 'Send', 'Pedro','Alejandro', 'Miguelanggelo', 'Gustavo', 'Monica','Nahum', 'Charbel', 'Pipo', 'Alexis','Juanita', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <>
                            <ListItem 
                                key={text}
                                onClick={() => setId(text)}
                                disablePadding 
                                sx={{position: 'relative', backgroundColor: idUser?.id === text ? "#eee" : ""}}
                            >
                                <ListItemButton>
                                    <Typography variant='caption' sx={{position: 'absolute', right: 0, top: 0, margin: '10px'}}>
                                        5:50 p. m.
                                    </Typography>
                                    <ListItemIcon>
                                        <Avatar/>
                                    </ListItemIcon>
                                    <ListItemText primary={text} secondary={"✓ " + text}/>
                                    <Badge sx={{position: 'absolute', right: 0, bottom: 0, margin: '20px'}} badgeContent={4} color="error"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider sx={{backgroundColor: '#f6f6f6'}} variant="inset" component="li" />
                        </>
                        ))}
                    </List> */}
                </Box>
            </Drawer>
        </>
    );
  };
  
  export default Menu;