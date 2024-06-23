import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (!user) return;

    const currentUserChatsRef = doc(db, "userchats", currentUser.id);
    const newUserChatsRef = doc(db, "userchats", user.id);

    try {
      // Check and create currentUserChatsRef document if it doesn't exist
      const currentUserChatsDoc = await getDoc(currentUserChatsRef);
      if (!currentUserChatsDoc.exists()) {
        await setDoc(currentUserChatsRef, { chats: [] });
      }

      // Check and create newUserChatsRef document if it doesn't exist
      const newUserChatsDoc = await getDoc(newUserChatsRef);
      if (!newUserChatsDoc.exists()) {
        await setDoc(newUserChatsRef, { chats: [] });
      }

      const newChatRef = doc(collection(db, "chats"));

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const chatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user.id,
        updatedAt: Date.now(),
      };

      await updateDoc(currentUserChatsRef, {
        chats: arrayUnion(chatData),
      });

      const receiverChatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
        updatedAt: Date.now(),
      };

      await updateDoc(newUserChatsRef, {
        chats: arrayUnion(receiverChatData),
      });

      console.log("User added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
