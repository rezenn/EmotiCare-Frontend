import React from "react";
import EditProfileComp from "../component/Profile/EditProfileComp";
import Navbar from "../component/Navbar/Navbar";

function EditProfile() {
  return (
    <div>
      <Navbar activePage="profile" />
      <EditProfileComp />
    </div>
  );
}

export default EditProfile;
