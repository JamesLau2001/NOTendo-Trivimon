import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByName } from "../utils";
import { UserContext } from "../contexts/UserContexts";
const AccountProfile = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const { name } = useParams();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  setLoggedInUser(name);

  useEffect(() => {
    getUserByName(name)
      .then((data) => {
        setUserData(data.user);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div>
        <p>{userData.username}</p>
        <img src={userData.avatar_url}></img>
      </div>
    </>
  );
};

export default AccountProfile;
