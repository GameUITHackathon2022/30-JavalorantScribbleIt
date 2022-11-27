import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Row, Col } from "antd";

import "./HomePage.css";
import { MainEvent } from "./components/MainEvent";
import { EventCard } from "./components/EventCard";
import { getEvents } from "../../apis/event.api";

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);

  const { isLoading, data } = useQuery(["events", page], () => getEvents(page), {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setEvents((prev) => [...prev, ...data.events.docs]);
    }
  }, [data]);

  const mainEventData = events[0] || {};
  const otherEventData = events.slice(1) || [{}, {}, {}, {}];

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      <Row>
        <Col span={24} justify="center">
          <MainEvent {...mainEventData} isLoading={isLoading} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {otherEventData.map((event, i) => (
          <Col
            key={i}
            sm={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <EventCard {...event} isLoading={isLoading} />
          </Col>
        ))}
        <Col className="gutter-row" span={6}></Col>
      </Row>
    </div>
  );
};
