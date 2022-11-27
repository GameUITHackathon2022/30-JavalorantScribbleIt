import React from "react";
import { Avatar, Card, Skeleton, Divider, Progress } from "antd";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

import "./EventCard.css";

const { Meta } = Card;

export const EventCard = ({
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
    navigate(`events/${_id}`);
  };

  const handleCheckClick = () => {
    console.log("click");
  };

  return (
    <Card
      className="event-card"
      cover={
        isLoading ? (
          <Skeleton.Image loading={isLoading} active style={{ width: 300, height: 250 }} />
        ) : (
          <img
            alt="thumbnail"
            src={`localhost:5000/api/files/image/${imageUrl}`}
            className="event-card__thumbnail"
          />
        )
      }
    >
      <Skeleton loading={isLoading} avatar active style={{ width: 200 }}>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<Link to={`organizations/${organization?._id}`}>{name}</Link>}
        />
        <div className="event-card__participants">
          <p>
            Number of participants: {participants?.length}/{maxJoin}
          </p>
          <Progress percent={Math.floor((participants?.length * 100) / maxJoin)} active={"true"} />
        </div>
      </Skeleton>
      <Divider />
      <Skeleton loading={isLoading} active paragraph={5} style={{ minWidth: "10vw" }}>
        <p style={{ fontStyle: "italic", fontSize: 15 }}>{description}</p>
        <table className="event-card__table">
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
        <div className="event-card__actions">
          <div className="event-card__button" onClick={handleDetailClick}>
            Detail
          </div>
          <div className="event-card__button event-card__button--border-left">Join</div>
        </div>
      )}
    </Card>
  );
};
