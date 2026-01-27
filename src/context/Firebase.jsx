import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, collection, setDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD-pQJGtbP2tdEf1JvDnevnaaWKy9XAP0g",
  authDomain: "resource-sharing-v1.firebaseapp.com",
  projectId: "resource-sharing-v1",
  storageBucket: "resource-sharing-v1.firebasestorage.app",
  messagingSenderId: "67508051747",
  appId: "1:67508051747:web:e83b6d4217623230737696",
  databaseURL: "https://resource-sharing-v1-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props)=>{
  const [user, setUser] = useState(null);
    const signUp = async (email, password, name) => {
      let user;
        
          const create = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          user = create.user;
          // await updateDoc(user,{displayName: name});
          return (await setDoc(doc(firestore,"users", user.uid), {
            uid: user.uid,
            email,
            name: name || "",
            role: "user",
            createdAt: serverTimestamp(),
          }));
        };

      const signUpWithGoogle = async () => {
        let user;
        const result = await signInWithPopup(firebaseAuth, provider);
        user = result.user;
        return (await setDoc(doc(firestore,"users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            role: "user",
            createdAt: serverTimestamp(),
          }));
      };

    const login = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
      };

      useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
          if(user) {
          console.log(user);
          setUser(user);
        } else {
          console.log("No user logged in");
          setUser(null);
        }
      }
      )}, []);

      const logout = () => {
        return signOut(firebaseAuth);
      }

  return (
    <FirebaseContext.Provider value={{signUp, signUpWithGoogle, login, user, logout}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}