import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Skeleton, Avatar, Progress, Divider, Row, Col } from "antd";

import { getOrganizationById } from "../../apis/organization.api";

const { Meta } = Card;

export const OrganizationPage = () => {
  const { organizationId } = useParams();
  const [organization, setOrganization] = useState(null);

  const { isLoading, data } = useQuery(["organization", organizationId], () =>
    getOrganizationById(organizationId)
  );

  useEffect(() => {
    if (data) {
      setOrganization(data.organization);
      console.log(data);
    }
  }, [data]);

  return (
    <Row>
      <Col span={12} offset={6}>
        <Card className="organization-page">Organization</Card>
      </Col>
    </Row>
  );
};
