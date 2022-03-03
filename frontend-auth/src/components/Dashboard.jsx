import React from "react";
import useAxios from "../hooks/useAxios";
import NavBar from "./NavBar";

const Dashboard = () => {
  const axInstance = useAxios();

  const onclickHandler = async () => {
    const data = await axInstance.get("/api/protect");
    console.log("protect data from backend", data);
  };

  return (
    <div>
      <NavBar username={"Mukesh"} onLogoutHandler={()=>{console.log("logout")}} />
      <button onClick={onclickHandler}>Send Request</button>
      Login Success
    </div>
  );
};

export default Dashboard;
