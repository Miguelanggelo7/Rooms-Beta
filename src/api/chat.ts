import { arrayUnion, collection, collectionGroup, doc, FieldPath, getDoc, getDocs, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { Message, User } from "../types"
import { db } from "./config"
import { query, where } from "firebase/firestore";

export const handleSendMessage = async (idSending: User, idReceiving: User, message: string) => {
  const combinedId = idSending.id > idReceiving.id ? idSending.id + idReceiving.id : idReceiving.id + idSending.id;
  try {
    const chatRef = doc(db, "chats", combinedId);
    const chatDoc = await getDoc(chatRef);

    const messageObj: Message = {
      userId: idSending.id,
      content: message,
      read: false,
      date: Timestamp.now(),
      type: "text"
    }

    if (!chatDoc.exists()){

      await setDoc(doc(db, "chats", combinedId), { messages: [messageObj]});

      await setDoc(doc(db, "userChats", idReceiving.id), {
        [combinedId]: {
          userInfo: idSending,
          lastMessage: messageObj.type === "text" ? messageObj.content : "",
          lastMessageIdUser: idSending.id,
          date: serverTimestamp()
        }
      }, { merge: true })

      await setDoc(doc(db, "userChats", idSending.id), {
        [combinedId]: {
          userInfo: idReceiving,
          lastMessage: messageObj.type === "text" ? messageObj.content : "",
          lastMessageIdUser: idSending.id,
          date: serverTimestamp()
        }
      }, { merge: true })

    } else {
        await updateDoc(chatRef, {
            messages: arrayUnion(messageObj)
        });

        await setDoc(doc(db, "userChats", idSending.id), {
          [combinedId]: {
            userInfo: idReceiving,
            lastMessage: messageObj.type === "text" ? messageObj.content : "",
            lastMessageIdUser: idSending.id,
            date: serverTimestamp()
          }
        }, { merge: true })

        await setDoc(doc(db, "userChats", idReceiving.id), {
          [combinedId]: {
            userInfo: idSending,
            lastMessage: messageObj.type === "text" ? messageObj.content : "",
            lastMessageIdUser: idSending.id,
            date: serverTimestamp()
          }
        }, { merge: true })
        
    }

  }
  catch(err) {}
}

export const getChat = async (myId: string, anotherId: string) => {
  const combinedId = myId > anotherId ? myId + anotherId : anotherId + myId;

  try {
    const chatRef = doc(db, "chats", combinedId);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      return null;
    }

    const chat = { ...chatDoc.data() };

    return chat;
  } catch (error) {
    return null;
  }

}