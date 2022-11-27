import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Skeleton, Avatar, Progress, Divider, Row, Col } from "antd";
import moment from "moment";

import "./EventPage.css";
import { getEventById } from "../../apis/event.api";

const { Meta } = Card;

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const { isLoading, data } = useQuery(["event-detail", eventId], () => getEventById(eventId));

  useEffect(() => {
    if (data) {
      setEvent(data.event);
    }
  }, [data]);

  return (
    <Row>
      <Col span={12} offset={6}>
        <Card
          className="event-detail"
          cover={
            isLoading ? (
              <Skeleton.Image loading={isLoading} active style={{ width: 300, height: 300 }} />
            ) : (
              <img alt="thumbnail" src={event?.imageUrl} className="event-detail__thumbnail" />
            )
          }
        >
          <Skeleton loading={isLoading} avatar active>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={event?.name}
              description={event?.organizationId}
            />
            <div className="event-detail__participants">
              <p>
                Number of participants: {event?.participants?.length}/{event?.maxJoin}
              </p>
              <Progress
                percent={Math.floor((event?.participants?.length * 100) / event?.maxJoin)}
                active={"true"}
              />
            </div>
          </Skeleton>
          <Divider />
          <Skeleton loading={isLoading} active paragraph={5}>
            <p style={{ fontStyle: "italic", fontSize: 15 }}>{event?.description}</p>
            <table className="event-detail__table">
              <tbody>
                <tr>
                  <td>Time: </td>
                  <td>{moment(event?.time).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                  <td>Country: </td>
                  <td>{event?.country}</td>
                </tr>
                <tr>
                  <td>City: </td>
                  <td>{event?.city}</td>
                </tr>
                <tr>
                  <td>District: </td>
                  <td>{event?.district}</td>
                </tr>
                <tr>
                  <td>Address: </td>
                  <td>{event?.address}</td>
                </tr>
              </tbody>
            </table>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};
