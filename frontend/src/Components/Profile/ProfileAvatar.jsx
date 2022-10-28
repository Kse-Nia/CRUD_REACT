import React from "react";

const ProfileAvatar = (props) => {
  return (
    <div className={`profile-avatar ${props.class}`}>
      <img
        src={props.imageUrl}
        alt="profil avatar"
        crossOrigin="anonymous"
        className="avatar"
      />
    </div>
  );
};

export default ProfileAvatar;
