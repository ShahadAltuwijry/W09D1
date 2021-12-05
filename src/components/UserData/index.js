import React, { useEffect, useState } from "react";

const UserData = () => {
  const [userData, setUserData] = useState([{}]);

  const user = async () => {
    const data = await localStorage.getItem("fullUser");
    // console.log(JSON.parse(data), "here");
    setUserData(JSON.parse(data));
  };

  useEffect(() => {
    user();
  }, []);
  return (
    <div className="userDataDiv">
      {/* {userData ? <h3>{userData.result.email}</h3> : ""} */}
    </div>
  );
};

export default UserData;
