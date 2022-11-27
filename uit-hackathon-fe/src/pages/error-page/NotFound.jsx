import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

export const NotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleOnClick}>
          Back Home
        </Button>
      }
    />
  );
};
