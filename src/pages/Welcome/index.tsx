import {useState} from 'react';
import Login from '../Login';

const Welcome = (): JSX.Element => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setOpen(true)}>xd</button>
      <Login open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Welcome;
