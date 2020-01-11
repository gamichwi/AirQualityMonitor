import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Container, Col, Row } from "react-bootstrap";

import './AirQuality.css'

const getEPAEnvMonitoring = async () => {
  const response = await axios.get(
    "https://www.epa.vic.gov.au/api/envmonitoring/sites?environmentalSegment=air"
  );
  console.log(response, "response");
  return response;
};

const AirQuality = props => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const EPA = getEPAEnvMonitoring();
    EPA.then(value => {
      if (value.data) {
        setSites(value.data.Model.records);
      }
    });
  }, []);

  useEffect(() => {
    console.log("useEffect in AirQuality");
  }, []);

  return (
    <div className="air-quality-component">
      <h1>EPA - Air Quality</h1>
      <Container>
          <Row>
              <Col>
      <ListGroup>
        {sites.map(site => {
            const style = {
                backgroundColor: site.siteHealthAdvices ? site.siteHealthAdvices[0].healthAdviceColor : ''
            }
          return (
            <ListGroup.Item key={site.siteID} className="site-list" style={style}>
              {site.siteName}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AirQuality;
