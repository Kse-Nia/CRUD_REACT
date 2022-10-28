import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Users from "../Components/Members/Users";

const MembersPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Users />
      </main>
    </>
  );
};

export default MembersPage;
