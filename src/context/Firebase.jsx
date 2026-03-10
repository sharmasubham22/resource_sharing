import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp, addDoc, collection, getDocs, getDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
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

            const defaultPhoto = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
            let userPhotoUrl = defaultPhoto;

            if (userPhoto) {
              const imageRef = ref(storage, `users/${user.uid}/profile/${Date.now()}-${userPhoto.name}`);
              const snapshot = await uploadBytes(imageRef, userPhoto);
              userPhotoUrl = await getDownloadURL(snapshot.ref);
            }

            return await setDoc(doc(firestore, "users", user.uid), {
              uid: user.uid,
              email,
              name: name,
              role: "user",
              userPhoto: userPhotoUrl,
              createdAt: serverTimestamp(),
            });
        };

      const signUpWithGoogle = async () => {
        let user;
        const result = await signInWithPopup(firebaseAuth, provider);
        user = result.user;
        const defaultPhoto = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
        return (await setDoc(doc(firestore,"users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            role: "user",
            userPhoto: user.photoURL || defaultPhoto,
            createdAt: serverTimestamp(),
          }));
      };

      const updateProfilePhoto = async (file) => {
        if (!user) throw new Error("No authenticated user");
        const imageRef = ref(storage, `users/${user.uid}/profile/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        await setDoc(doc(firestore, "users", user.uid), { userPhoto: url }, { merge: true });
        setUser((prev) => ({ ...prev, userPhoto: url }));
        return url;
      };

    const login = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
      };

      useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
          if(user) {
            // console.log(user);
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
            user_id: user.uid,
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

      const categorizedResources = async (category) => {
        const q = query(
          collection(firestore, "allResources"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot;
      }

      const getResourceImg = (path) => {
        return getDownloadURL(ref(storage, path));
      }

      const deleteResource = async (id) => {
        const result = await deleteDoc(
          doc(firestore, "users", user.uid, "resources", id)
        );
        const result2 = await deleteDoc(
          doc(firestore, "allResources", id)
        );
        return { result, result2 };
      }

      const updateResource = async (id, data) => {
        const userRef = doc(firestore, "users", user.uid, "resources", id);
        const ResourceRef = doc(firestore, "allResources", id);

        let updatePayload = { ...data };

        // Handle cover photo upload if file object is present
        if (data.coverPhoto && typeof data.coverPhoto === "object" && data.coverPhoto.name) {
          const imageRef = ref(storage, `resources/cover/${Date.now()}-${data.coverPhoto.name}`);
          const snapshot = await uploadBytes(imageRef, data.coverPhoto);
          updatePayload.coverPhoto = snapshot.ref.fullPath;
        }

        // Handle file upload for resource file if file object is present
        if (data.file && typeof data.file === "object" && data.file.name) {
          const fileRef = ref(storage, `resources/files/${Date.now()}-${data.file.name}`);
          const snapshot = await uploadBytes(fileRef, data.file);
          updatePayload.file = snapshot.ref.fullPath;
        }

        const result = await updateDoc(userRef, updatePayload);
        const result2 = await updateDoc(ResourceRef, updatePayload);

        return { result, result2 };
      }

      const addBlog = async (
        title,
        description,
        coverPhoto,
      ) => {
        try {
          let coverPhotoPath = null;
          if (coverPhoto) {
            const imageRef = ref(
              storage,
              `blogs/cover/${Date.now()}-${coverPhoto.name}`,
            );
            const snapshot = await uploadBytes(imageRef, coverPhoto);
            coverPhotoPath = snapshot.ref.fullPath;
          }

          const result = await addDoc(
            collection(firestore, `users/${user.uid}/blogs`),
            {
              title: title,
              description: description,
              coverPhoto: coverPhotoPath,
              createdAt: serverTimestamp(),
            },
          );
          console.log("Blog added with ID:", result.id);
          const result2 = await setDoc(
            doc(firestore, "allBlogs", result.id),
            {
              user_id: user.uid,
              userName: user.name,
              title: title,
              description: description,
              coverPhoto: coverPhotoPath,
              createdAt: serverTimestamp(),
            },
          );
          return (result, result2);
        } catch (error) {
          console.error("Error adding blog:", error);
          throw error;
        }
      };

      const getAllBlogs = () => {
        return getDocs(collection(firestore, "allBlogs"));
      };

      const getMyBlogs = async () => {
        const currentUser = user;
        return await getDocs(
          collection(firestore, `users/${currentUser.uid}/blogs`),
        );
      };

      const viewBlog = async (id) => {
        const docRef = doc(firestore, "allBlogs", id);
        const result = await getDoc(docRef);
        return result;
      };

      const getBlogImg = (path) => {
        return getDownloadURL(ref(storage, path));
      };

      const deleteBlog = async (id) => {
        const result = await deleteDoc(
          doc(firestore, "users", user.uid, "blogs", id),
        );
        const result2 = await deleteDoc(doc(firestore, "allBlogs", id));
        return { result, result2 };
      };

      const updateBlog = async (id, data) => {
        const userRef = doc(firestore, "users", user.uid, "blogs", id);
        const blogRef = doc(firestore, "allBlogs", id);

        let updatePayload = { ...data };

        // Handle cover photo upload if file object is present
        if (
          data.coverPhoto &&
          typeof data.coverPhoto === "object" &&
          data.coverPhoto.name
        ) {
          const imageRef = ref(
            storage,
            `blogs/cover/${Date.now()}-${data.coverPhoto.name}`,
          );
          const snapshot = await uploadBytes(imageRef, data.coverPhoto);
          updatePayload.coverPhoto = snapshot.ref.fullPath;
        }

        const result = await updateDoc(userRef, updatePayload);
        const result2 = await updateDoc(blogRef, updatePayload);

        return { result, result2 };
      };

  return (
    <FirebaseContext.Provider value={{signUp, signUpWithGoogle, login, loggedin, user, logout, addResource, getAllResources, getMyResources, viewResource, getResourceImg, categorizedResources, updateProfilePhoto, deleteResource, updateResource, addBlog, getAllBlogs, getMyBlogs, viewBlog, getBlogImg, deleteBlog, updateBlog}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}