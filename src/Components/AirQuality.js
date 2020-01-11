import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Container, Col, Row, Card } from "react-bootstrap";

import "./AirQuality.css";

const getEPAEnvMonitoring = async () => {
  const response = await axios.get(
    "https://www.epa.vic.gov.au/api/envmonitoring/sites?environmentalSegment=air"
  );
  console.log(response, "response");
  return response;
};

const AirQuality = props => {
  const [sites, setSites] = useState([]);
  const [siteDetails, setSiteDetails] = useState(null);

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

  const onSiteClick = listIndex => {
    console.log(listIndex, "listindex");
    const siteRecord = sites[listIndex];
    console.log(siteRecord);
    setSiteDetails(siteRecord);
  };

  return (
    <div className="air-quality-component">
      <h1>EPA - Air Quality</h1>
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {sites.map((site, index) => {
                const style = {
                  backgroundColor: site.siteHealthAdvices
                    ? site.siteHealthAdvices[0].healthAdviceColor
                    : ""
                };
                return (
                  <ListGroup.Item
                    key={site.siteID}
                    className="site-list"
                    style={style}
                    onClick={() => onSiteClick(index)}
                  >
                    {site.siteName}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col>
            <h3>Details</h3>
            {siteDetails && <Card>
              <Card.Body>
                <Card.Title>{siteDetails.siteName}</Card.Title>
                {siteDetails.siteHealthAdvices && <Card.Subtitle>Air quality: {siteDetails.siteHealthAdvices[0].healthAdvice} </Card.Subtitle>}
                <Card.Img variant="top" src={siteDetails.cameraImageURL} />
              </Card.Body>
            </Card>
        }
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AirQuality;
