import React from "react";
import { Avatar, Card, Skeleton, Divider, Progress } from "antd";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

import "./MainEvent.css";

const { Meta } = Card;

export const MainEvent = ({
  name,
  description,
  maxJoin,
  time,
  organization,
  participants,
  country,
  city,
  district,
  address,
  imageUrl,
  isLoading,
  _id,
}) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/events/${_id}`);
  };

  const handleJoinClick = () => {
    console.log("click");
  };

  return (
    <Card
      className="main-event"
      cover={
        isLoading ? (
          <Skeleton.Image
            loading={isLoading}
            active
            style={{ minWidth: "30vw", minHeight: "60vh" }}
          />
        ) : (
          <img className="main-event__thumbnail" alt="thumbnail" src={imageUrl} />
        )
      }
    >
      <Skeleton loading={isLoading} avatar active style={{ minWidth: "30vw" }}>
        <div className="main-event__detail">
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<Link to={`organizations/${organization?._id}`}>{name}</Link>}
          />
          <div className="main-event__participants">
            <p>
              Number of participants: {participants?.length}/{maxJoin}
            </p>
            <Progress
              percent={Math.floor((participants?.length * 100) / maxJoin)}
              active={"true"}
            />
          </div>
        </div>
      </Skeleton>

      <Divider />

      <Skeleton loading={isLoading} active paragraph={5}>
        <p className="main-event__description">{description}</p>
        <table className="main-event__table">
          <tbody>
            <tr>
              <td>Time: </td>
              <td>{moment(time).format("DD-MM-YYYY")}</td>
            </tr>
            <tr>
              <td>Country: </td>
              <td>{country}</td>
            </tr>
            <tr>
              <td>City: </td>
              <td>{city}</td>
            </tr>
            <tr>
              <td>District: </td>
              <td>{district}</td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>{address}</td>
            </tr>
          </tbody>
        </table>
      </Skeleton>

      {!isLoading && (
        <div className="main-event__actions">
          <div className="main-event__button" onClick={handleDetailClick}>
            Detail
          </div>
          <div className="main-event__button main-event__button--border-left">Join</div>
        </div>
      )}
    </Card>
  );
};
