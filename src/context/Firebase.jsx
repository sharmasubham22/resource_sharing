import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props)=>{
  const [user, setUser] = useState(null);
    const signUp = async (email, password, name) => {
      let user;
        
          const create = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          user = create.user;
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

      const loggedin = user ? true : false;

      const logout = () => {
        return signOut(firebaseAuth);
      }

      const addResource = async(title, description, coverPhoto, type, link, codeSnippet, uploadFile, category, tags) => {
        try {

          let coverPhotoPath = null;
          if (coverPhoto) {
            const imageRef = ref(storage, `resources/cover/${Date.now()}-${coverPhoto.name}`);
            const snapshot = await uploadBytes(imageRef, coverPhoto);
            coverPhotoPath = snapshot.ref.fullPath;
          }

          let filePath = null;
          if (uploadFile) {
            const fileRef = ref(
              storage,
              `resources/files/${Date.now()}-${uploadFile.name}`,
            );
            const snapshot = await uploadBytes(fileRef, uploadFile);
            filePath = snapshot.ref.fullPath;
          }

          const result = await addDoc(collection(firestore, `users/${user.uid}/resources`), {
            title: title,
            description: description,
            coverPhoto: coverPhotoPath,
            type: type,
            link: link,
            codeSnippet: codeSnippet,
            uploadFile: filePath,
            category: category,
            tags: tags,
            createdAt: serverTimestamp(),
          });
          console.log("Resource added with ID:", result.id);
          const result2 = await setDoc(doc(firestore,"allResources", result.id), {
            user: user.uid,
            title: title,
            description: description,
            coverPhoto: coverPhotoPath,
            type: type,
            link: link,
            codeSnippet: codeSnippet,
            uploadFile: filePath,
            category: category,
            tags: tags,
            createdAt: serverTimestamp(),
          });
          return result, result2;
          
        } catch (error) {
          console.error("Error adding resource:", error);
          throw error;
        }
      }

  return (
    <FirebaseContext.Provider value={{signUp, signUpWithGoogle, login, loggedin, user, logout, addResource}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}