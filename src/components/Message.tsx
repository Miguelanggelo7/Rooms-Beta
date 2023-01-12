import { Card, Typography } from "@mui/material";
import { useUser } from "../hooks/useUser";

export default function Message({message}: any) {

  const user = useUser()!;

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

  return (
    <Card elevation={1} sx={ user.id !== message.userId ? {backgroundColor: "#fff", margin: 0.5, marginTop: 0.5, marginLeft: 5, minWidth: 80} : {backgroundColor: '#f3d9ff', margin: 1, marginRight: 5, marginTop: 0.5, minWidth: 80}}>
      <div style={{paddingRight: 15, paddingBottom: 20, paddingLeft: 10, paddingTop: 10, position: 'relative'}}>
        <Typography 
          sx={{ wordWrap: "break-word" }}
        >
          {message.content}
        </Typography>
        <Typography variant='caption' sx={{position: 'absolute', right: 0, bottom: 0, marginRight: '5px', color: 'gray'}}>
            {
            // @ts-ignore
            formatDate(message.date.toDate()) === formatDate((new Date)) ?
            // @ts-ignore
            message.date.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) :
            // @ts-ignore
            formatDate(message.date.toDate())
            } 
        </Typography>
      </div>
    </Card>
  );
}