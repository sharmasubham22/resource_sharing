import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp, addDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    const signUp = async (email, password, name, userPhoto) => {
      let user;
        
          const create = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          user = create.user;

           let UserPhotoPath = null;
           if (userPhoto) {
             const imageRef = ref(
               storage,
               `resources/user/${Date.now()}-${userPhoto.name}`,
             );
             const snapshot = await uploadBytes(imageRef, userPhoto);
             UserPhotoPath = snapshot.ref.fullPath;
           }

          return await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            email,
            name: name,
            role: "user",
            userPhoto:
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" || UserPhotoPath,
            createdAt: serverTimestamp(),
          });
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
        onAuthStateChanged(firebaseAuth, async (user) => {
          if(user) {
            console.log(user);
            // Try to fetch extended profile from Firestore and merge it with auth user
            try {
              const docRef = doc(firestore, "users", user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const data = docSnap.data();
                setUser({ ...user, ...data });
              } else {
                setUser(user);
              }
            } catch (err) {
              console.error("Error fetching user profile:", err);
              setUser(user);
            }
          } else {
            console.log("No user logged in");
            setUser(null);
          }
        })
      }, []);

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
            userName: user.name,
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

      const getAllResources = () => {
        return getDocs(collection(firestore, "allResources"));
      }

      const getMyResources = async () => {
        const currentUser = user;
        return await getDocs(
          collection(firestore, `users/${currentUser.uid}/resources`),
        );
      };

      const viewResource = async (id) => {
        const docRef = doc(firestore, "allResources", id);
        const result = await getDoc(docRef);
        return result;
      }

      const getResourceImg = (path) => {
        return getDownloadURL(ref(storage, path));
      }

  return (
    <FirebaseContext.Provider value={{signUp, signUpWithGoogle, login, loggedin, user, logout, addResource, getAllResources, getMyResources, viewResource, getResourceImg}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}