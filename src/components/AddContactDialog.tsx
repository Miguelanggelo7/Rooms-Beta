import {
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    TextField,
} from '@mui/material';
import {useState, useEffect} from 'react';
import { getUserByEmail } from '../api/user';
import { User } from '../types';
import { useSnackbar } from "notistack";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  setId: (value: User | null) => void;
}

const AddContactDialog = (props: SimpleDialogProps) => {

  const { enqueueSnackbar } = useSnackbar();

  const { onClose, open, setId } = props;

  useEffect(() => {
    setEmail("");
    setDisabledActions(false);
  }, [open])

  const [email, setEmail] = useState<string>("");

  const [disabledActions, setDisabledActions] = useState<boolean>(false)

  const startNewChat = async () => {
    setDisabledActions(true);
    const userChat = await getUserByEmail(email);
    if (!userChat) {
      setDisabledActions(false);
      return enqueueSnackbar("Este correo electrónico no pertenece a ningún usuario de Rooms", { variant: "error" });
    } else {
        //@ts-ignore
        setId(userChat);
    }
    onClose();
  } 

  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>Empezar un nuevo chat</DialogTitle>
      <DialogContent>
        <TextField 
          fullWidth
          label="Correo electrónico"
          variant='standard'
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={disabledActions} color="secondary" onClick={onClose}>
            Cancelar
        </Button>
        <Button disabled={disabledActions || !email} onClick={startNewChat}>
            Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddContactDialog;