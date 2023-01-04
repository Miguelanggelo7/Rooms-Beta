import { ArrowBack, Check, Edit } from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { IconButton, Typography, Avatar, TextField, InputAdornment } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { motion } from 'framer-motion';
import { useUser } from "../hooks/useUser";
import { updateUser } from "../api/auth";
import { User } from "../types";

export default function ProfileDrawer({ open, onOpen, onClose }: any) {

  const user = useUser()!;

  const [name, setName] = useState<string>(user.name);
  const [info, setInfo] = useState<string>(user.info);
  const [editName, setEditName] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>(user);

  useEffect(() => {
    if (!open){
      setEditName(false);
      setEditInfo(false);
      setName(user.name);
      setInfo(user.info);
    }; 
  }, [open]);

  useEffect(() => {
    updateUser(newUser.id, newUser);
  }, [newUser]);

  const handleChangeField = (field: string, value: string)=> {
    setNewUser((previous) => ({ ...previous, [field]: value }));
  };

  const handleChangeName = () => {
    setEditName(false);
    handleChangeField("name", name);
  }

  const handleChangeInfo = () => {
    setEditInfo(false);
    handleChangeField("info", info);
  }

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        sx={{width: 400, zIndex: '9999'}}
        BackdropProps={{ invisible: true }}
        elevation={0}
      >
        <div style={{width: 400, backgroundColor: '#f6f6f6', height: '100vh'}}>
          <div style={{ backgroundColor: '#682bd7', height: 110, position: 'relative' }} > 
            <div style={{position: 'absolute', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10pt', bottom: 0, marginBottom: '10pt'}}>
              <IconButton onClick={onClose} sx={{color: '#fff'}}>
                <ArrowBack/>
              </IconButton>
              <Typography variant="h6" sx={{fontWeight: '500', marginLeft: '20pt', color: '#fff'}}> 
                Perfil
              </Typography>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '20pt'}}>
            <motion.div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}  
              initial={{ opacity: 0, scale: 0.3, height: 0 }}
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0, height: open ? '200px' : '100px' }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <Avatar sx={{cursor: 'pointer', margin: 'auto', width: '200px', height: '200px'}} alt={user.name} src={user.image ? user.image : ""} />
            </motion.div>
          </div>
          <div style={{textAlign: 'center', marginTop: '10pt'}}>
            <Typography>
              {user.email}
            </Typography>
          </div>
          <div style={{width: '100%', marginTop: '20pt', backgroundColor: '#fff', boxShadow: '0 4px 2px -2px rgba(0,0,0,0.1)', padding: '10pt', paddingLeft: '30pt', paddingRight: '30pt'}}>
              <Typography variant="body2" color="primary">
                Tu nombre
              </Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
                fullWidth
                disabled={ editName ? false : true}
                InputProps={{
                  
                  disableUnderline: editName ? false : true,
                  endAdornment: (
                      <InputAdornment position="end">
                          { editName ? <Check fontSize="small" sx={{cursor: 'pointer'}} onClick={handleChangeName}/> : <Edit fontSize="small" sx={{cursor: 'pointer'}} onClick={() => setEditName(true)}/>}
                      </InputAdornment>
                  ),
              }}
                sx={{
                  marginTop: '20pt',
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    borderBottom: 'none',
                  },
                }}
              />
          </div>
          <div style={{textAlign: 'center', marginTop: '10pt'}}>
            <Typography variant="caption">
              Este nombre será visible para tus contactos de Rooms.
            </Typography>
          </div>

          <div style={{width: '100%', marginTop: '20pt', boxShadow: '0 4px 2px -2px rgba(0,0,0,0.1)', backgroundColor: '#fff', padding: '10pt', paddingLeft: '30pt', paddingRight: '30pt'}}>
              <Typography variant="body2" color="primary">
                Información
              </Typography>
              <TextField
                value={info}
                placeholder="Escribe algo..."
                onChange={(e) => setInfo(e.target.value)}
                variant="standard"
                fullWidth
                disabled={ editInfo ? false : true}
                InputProps={{
                  
                  disableUnderline: editInfo ? false : true,
                  endAdornment: (
                      <InputAdornment position="end">
                          { editInfo ? <Check fontSize="small" sx={{cursor: 'pointer'}} onClick={handleChangeInfo}/> : <Edit fontSize="small" sx={{cursor: 'pointer'}} onClick={() => setEditInfo(true)}/>}
                      </InputAdornment>
                  ),
              }}
                sx={{
                  marginTop: '20pt',
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                    borderBottom: 'none',
                  },
                }}
              />
          </div>

        </div>
      </SwipeableDrawer>
    </>
  );
}