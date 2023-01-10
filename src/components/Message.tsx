import { useUser } from "../hooks/useUser";
import { Message } from "../types";

export default function Message({ content, read, date, type, userId }: Message) {

  const user = useUser()!;

  return (
    <div style={ user.id === userId ? {width: '40%', position: 'absolute', right: 0, backgroundColor: "f3d99f"} : {width: '40%', position: 'absolute', left: 0, backgroundColor: '#fff'}}>
      {content}
    </div>
  );
}