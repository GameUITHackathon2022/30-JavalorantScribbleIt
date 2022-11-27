import React from "react";
import { Button, Divider, Typography } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./LoginPage.css";
import environmentImg from "../../assets/undraw_environment_iaus.svg";
import { login } from "../../apis/auth.api";

const { Title } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("uit-hackathon-token");
  if (token) {
    navigate("/");
  }

  const responseGoogle = async ({ credential }) => {
    const { token } = await login(credential);

    if (token) {
      toast.success("Login successfully!");
      localStorage.setItem("uit-hackathon-token", JSON.stringify(token));
      navigate("/");
    } else {
      toast.error("Oops! Something went wrong");
    }
  };

  const handleReturnClick = () => {
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-page__image-wrapper">
        <img src={environmentImg} alt="environment" className="login-page__image" />
      </div>
      <div className="login-page__form">
        <Title level={2} className="login-page__welcome">
          Welcome to
        </Title>
        <Title className="login-page__title">Greener Globe</Title>

        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            toast.error("Login failed!");
          }}
        />

        <Divider plain> or </Divider>

        <Button onClick={handleReturnClick}>Continue as guest</Button>
      </div>
    </div>
  );
};
