import React from "react";
import EditProfileComp from "../component/Profile/EditProfileComp";
import Navbar from "../component/Navbar/Navbar";
import Footer2 from "../component/Footer/Footer2";

function EditProfile() {
  return (
    <div>
      <Navbar activePage="profile" />
      <EditProfileComp />
      <Footer2 />
    </div>
  );
}

export default EditProfile;
