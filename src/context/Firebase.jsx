import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import { getFirestore, setDoc, doc, serverTimestamp, addDoc, collection, getDocs, getDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

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

      const addResource = async (
        title,
        description,
        coverPhoto,
        type,
        link,
        codeSnippet,
        uploadFile,
        category,
        tags,
      ) => {
        try {
          let coverPhotoPath = null;
          if (coverPhoto) {
            const imageRef = ref(
              storage,
              `resources/cover/${Date.now()}-${coverPhoto.name}`,
            );
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

          const result = await addDoc(collection(firestore, "allResources"), {
            user: {
              uid: user.uid,
              name: user.name,
              userPhoto: user.photoURL,
            },
            title,
            description,
            coverPhoto: coverPhotoPath,
            type,
            link,
            codeSnippet,
            uploadFile: filePath,
            category,
            tags,

            ratingAverage: 0,
            ratingCount: 0,

            createdAt: serverTimestamp(),
          });

          console.log("Resource added with ID:", result.id);
          return result;
        } catch (error) {
          console.error("Error adding resource:", error);
          throw error;
        }
      };

      const addComment = async (resourceId, comment) => {
        try {
          const result = await addDoc(
            collection(firestore, `allResources/${resourceId}/comments`),
            {
              user: {
                uid: user.uid,
                name: user.name,
                userPhoto: user.photoURL,
              },
              comment: comment,
              createdAt: serverTimestamp(),
            },
          );

          return result;
        } catch (error) {
          console.error("Error adding comment:", error);
          throw error;
        }
      };

      const getComments = async (resourceId) => {
        try {          
          const snapshot = await getDocs(
            collection(firestore, `allResources/${resourceId}/comments`),
          );

          return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error fetching comments:", error);
          return [];
        }
      }

      const addRating = async (resourceId, rating) => {
        try {
          const resourceRef = doc(firestore, "allResources", resourceId);
          const resourceSnap = await getDoc(resourceRef);

          if (!resourceSnap.exists()) {
            throw new Error("Resource not found");
          }

          const resourceData = resourceSnap.data();

          // Calculate new average rating and count
          const newRatingCount = (resourceData.ratingCount || 0) + 1;
          const newRatingAverage =
            ((resourceData.ratingAverage || 0) * (resourceData.ratingCount || 0) + rating) /
            newRatingCount;

          // Update the resource document with new rating values
          await updateDoc(resourceRef, {
            ratingAverage: newRatingAverage,
            ratingCount: newRatingCount,
          });

          return { ratingAverage: newRatingAverage, ratingCount: newRatingCount };
        } catch (error) {
          console.error("Error submitting rating:", error);
          throw error;
        }   
      }
      

      const getAllResources = async () => {
        try {
          const snapshot = await getDocs(collection(firestore, "allResources"));

          const resources = await Promise.all(
            snapshot.docs.map(async (resourceDoc) => {
              const resourceData = resourceDoc.data();

              let userData = null;

              // check if user_id exists
              if (resourceData.user_id) {
                const userRef = doc(firestore, "users", resourceData.user_id);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                  userData = userSnap.data();
                }
              }

              return {
                id: resourceDoc.id,
                ...resourceData,
                user: userData,
              };
            }),
          );

          return resources;
        } catch (error) {
          console.error("Error fetching resources:", error);
          return [];
        }
      };

      const getMyResources = async (userId) => {
        // const currentUser = user;
        // return await getDocs(
        //   collection(firestore, `users/${currentUser.uid}/resources`),
        // );
          try {
            if (!userId) {
              console.warn("User ID is undefined");
              return [];
            }

            const q = query(
              collection(firestore, "allResources"),
              where("user_id", "==", userId),
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
          } catch (error) {
            console.error("Error fetching my resources:", error);
            return [];
          }
      };

      const viewResource = async (id) => {
        try {
          const docRef = doc(firestore, "allResources", id);
          const resourceSnap = await getDoc(docRef);

          if (!resourceSnap.exists()) {
            throw new Error("Resource not found");
          }

          const resourceData = resourceSnap.data();

          let userData = null;

          if (resourceData.user_id) {
            const userRef = doc(firestore, "users", resourceData.user_id);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              userData = userSnap.data();
            }
          }

          return {
            id: resourceSnap.id,
            ...resourceData,
            user: userData,
          };
        } catch (error) {
          console.error("Error fetching resource:", error);
          return null;
        }
      };

      const categorizedResources = async (category) => {
        const q = query(
          collection(firestore, "allResources"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot;
      }

      const getResourceImg = (path) => {
        if (!path) return Promise.resolve(null); // prevent root reference error
        const imageRef = ref(storage, path);
        return getDownloadURL(imageRef);
      };

      const deleteResource = async (id) => {
        try {
          // get resource document
          const resourceRef = doc(firestore, "allResources", id);
          const resourceSnap = await getDoc(resourceRef);

          if (resourceSnap.exists()) {
            const resourceData = resourceSnap.data();

            // helper function to convert URL → storage path
            const getPath = (urlOrPath) => {
              if (!urlOrPath) return null;

              if (urlOrPath.includes("firebasestorage")) {
                return decodeURIComponent(
                  urlOrPath.split("/o/")[1].split("?")[0],
                );
              }

              return urlOrPath;
            };

            // delete cover photo
            if (resourceData.coverPhoto) {
              try {
                const path = getPath(resourceData.coverPhoto);
                const coverRef = ref(storage, path);
                await deleteObject(coverRef);
              } catch (err) {
                console.error("Error deleting cover photo:", err);
              }
            }

            // delete uploaded file
            if (resourceData.uploadFile) {
              try {
                const path = getPath(resourceData.uploadFile);
                const fileRef = ref(storage, path);
                await deleteObject(fileRef);
              } catch (err) {
                console.error("Error deleting uploaded file:", err);
              }
            }
          }

          await deleteDoc(doc(firestore, "allResources", id));

          return { success: true };
        } catch (error) {
          console.error("Error deleting resource:", error);
          return { success: false };
        }
      };

      const updateResource = async (id, data) => {
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

        const result = await updateDoc(ResourceRef, updatePayload);

        return { result };
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

          const result = await addDoc(collection(firestore, "allBlogs"), {
            user_id: user.uid,
            userName: user.name,
            title: title,
            description: description,
            coverPhoto: coverPhotoPath,
            createdAt: serverTimestamp(),
          });
          
          console.log("Blog added with ID:", result.id);
          return result;
        } catch (error) {
          console.error("Error adding blog:", error);
          throw error;
        }
      };

      const getAllBlogs = async () => {
        const snapshot = await getDocs(collection(firestore, "allBlogs"));

        const blogs = await Promise.all(
          snapshot.docs.map(async (blogDoc) => {
            const blogData = blogDoc.data();

            // get user using user_id
            const userRef = doc(firestore, "users", blogData.user_id);
            const userSnap = await getDoc(userRef);

            return {
              id: blogDoc.id,
              ...blogData,
              user: userSnap.data(),
            };
          }),
        );

        return blogs;
      };

      const getMyBlogs = async (userId) => {
        try {
          if (!userId) {
            console.warn("User ID is undefined");
            return [];
          }

          const q = query(
            collection(firestore, "allBlogs"),
            where("user_id", "==", userId),
          );

          const snapshot = await getDocs(q);

          return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error("Error fetching my blogs:", error);
          return [];
        }
      };

      const viewBlog = async (id) => {
        const docRef = doc(firestore, "allBlogs", id);
        const result = await getDoc(docRef);

        const blogData = result.data();

        const userRef = doc(firestore, "users", blogData.user_id);
        const userSnap = await getDoc(userRef);

        return {
          id: result.id,
          ...blogData,
          user: userSnap.data(),
        };
      };

     const getBlogImg = (path) => {
       if (!path) return Promise.resolve(null); // prevent root reference error
       const imageRef = ref(storage, path);
       return getDownloadURL(imageRef);
     };

      const deleteBlog = async (id) => {
        // const result = await deleteDoc(doc(firestore, "allBlogs", id));
        // return result;
        try {
          const blogRef = doc(firestore, "allBlogs", id);
          const blogSnap = await getDoc(blogRef);

          if (blogSnap.exists()) {
            const blogData = blogSnap.data();

            // helper function to convert URL → storage path
            const getPath = (urlOrPath) => {
              if (!urlOrPath) return null;

              if (urlOrPath.includes("firebasestorage")) {
                return decodeURIComponent(
                  urlOrPath.split("/o/")[1].split("?")[0],
                );
              }

              return urlOrPath;
            };

            // delete cover photo
            if (blogData.coverPhoto) {
              try {
                const path = getPath(blogData.coverPhoto);
                const coverRef = ref(storage, path);
                await deleteObject(coverRef);
              } catch (err) {
                console.error("Error deleting cover photo:", err);
              }
            }
          }

          await deleteDoc(doc(firestore, "allBlogs", id));

          return { success: true };
        } catch (error) {
          console.error("Error deleting blog:", error);
          return { success: false };
        }
      };

      const updateBlog = async (id, data) => {
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

        const result = await updateDoc(blogRef, updatePayload);

        return result;
      };

  return (
    <FirebaseContext.Provider value={{signUp, signUpWithGoogle, login, loggedin, user, logout, addResource, addComment, getComments, addRating, getAllResources, getMyResources, viewResource, getResourceImg, categorizedResources, updateProfilePhoto, deleteResource, updateResource, addBlog, getAllBlogs, getMyBlogs, viewBlog, getBlogImg, deleteBlog, updateBlog}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}