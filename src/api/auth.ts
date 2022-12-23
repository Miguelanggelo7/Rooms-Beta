import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db, storage } from "./config";
import { User } from "../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface SignUpUserData {
  name: string;
  email: string;
  password: string;
}

interface LogInUserData {
  email: string;
  password: string;
}

export const signUp = async ({ name, email, password }: SignUpUserData) => {
  if(name !== ""){
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });
  
      return null;
    } catch (error) {
  
      let errorMessage = "Error desconocido";
  
      if (error instanceof FirebaseError) {
        console.log(error.code)
        switch (error.code) {
          case AuthErrorCodes.INVALID_EMAIL:
          case "auth/missing-email":
            errorMessage = "Email invalido";
            break;
          case AuthErrorCodes.INTERNAL_ERROR:
            errorMessage = "Ingrese su contraseña";
            break;
          case AuthErrorCodes.EMAIL_EXISTS:
            errorMessage = "El email ingresado ya está en uso";
            break;
          default:
            errorMessage = "Error desconocido";
            break;
        }
      }
      return errorMessage;
    }
  } else {
    return "Ingrese su nombre";
  }
};

export const logIn = async ({ email, password }: LogInUserData) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return null;
  } catch (error) {
    let errorMessage = "Error desconocido";

    if (error instanceof FirebaseError) {
      console.log(error.code)
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
        case "auth/missing-email":
          errorMessage = "Email invalido";
          break;
        case AuthErrorCodes.INTERNAL_ERROR:
          errorMessage = "Ingrese su contraseña";
          break;
        case AuthErrorCodes.USER_DELETED:
        case AuthErrorCodes.INVALID_PASSWORD:
          errorMessage = "Email o contraseña incorrectos";
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          errorMessage = "Cuenta bloqueada temporalmente";
          break;
        default:
          errorMessage = "Error desconocido";
          break;
      }
    }
    return errorMessage;
  }
};

export const updateUser = async (id: string, field: any) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, field);
  } catch (error) {
    return error;
  }
};

const uploadFiles = async (uid: any, files: any) => {
  try {
    const imageRef = ref(storage, `users/${uid}`);
    const resUpload = await uploadBytes(imageRef, files);
    const url = await getDownloadURL(resUpload.ref);
    await updateUser(uid, { image: url });

    return url;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }

    const user = { ...userDoc.data(), id } as User;

    return user;
  } catch (error) {
    return null;
  }
};

export const GoogleUser = async (userData: any, uid: string, photo: any) => {
  try {
    const user = await getUser(uid);
    if (!user) {
      await setDoc(doc(db, "users", uid), userData);
      await updateUser(uid, { image: photo });
    }
  } catch(error) {
    return null;
  }
}

export const GoogleAuth = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider);
    console.log(credentials);

    auth.onAuthStateChanged((user) => {
      if (user) {
        
        const userData = {
          name: credentials.user.displayName!,
          email: credentials.user.email!,
        };

        GoogleUser(userData, user.uid, user.photoURL)

      }
    });

  } catch(error) {
    console.log(error)
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return null;
  } catch (error) {
    return "Error desconocido";
  }
};
