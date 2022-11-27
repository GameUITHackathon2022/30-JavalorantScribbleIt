import React from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./ChooseRole.css";
import selectingImg from "../../assets/undraw_selecting_team_re_ndkb.svg";
import { chooseRole } from "../../apis/auth.api";

export const ChooseRole = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("uit-hackathon-token");
  const decoded = jwt_decode(token);

  const handleChoooseUser = async () => {
    const result = await chooseRole("user", decoded.email);
    if (result && result.user) {
      toast.success("You have chosen user");
      navigate("/");
    } else {
      toast.error("Sorry! Something went wrong");
    }
  };

  const handleChooseOrganization = async () => {
    const result = await chooseRole("organization_member", decoded.email);
    if (result && result.user) {
      toast.success("You have chosen organization");
      navigate("/");
    } else {
      toast.error("Sorry! Something went wrong");
    }
  };

  return (
    <div className="choose-role">
      <div className="choose__option-wrapper">
        <div className="choose__title">Please choose a role to continue</div>
        <div className="choose__option" onClick={handleChoooseUser}>
          Normal User
        </div>
        <div className="choose__option" onClick={handleChooseOrganization}>
          Organization
        </div>
      </div>
      <div className="choose__image-wrapper">
        <img src={selectingImg} className="choose__image" alt="Selecting" />
      </div>
    </div>
  );
};
