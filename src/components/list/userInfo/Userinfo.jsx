import "./userInfo.css";
import { useUserStore } from "../../../lib/userStore";

const Userinfo = () => {
 const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="user-img" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="moree" />
        <img src="./video.png" alt="videoo" />
        <img src="./edit.png" alt="editss" />
      </div>
    </div>
  );
};

export default Userinfo;
