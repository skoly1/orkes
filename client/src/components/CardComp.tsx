import { Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { DataArrayItem } from "../machines/scrollFetchMachine";

interface CardProps {
  data: DataArrayItem;
}
const CardComp: React.FC<CardProps> = ({ data }) => {
  const { node } = data;
  return (
    <>
      <Card>
        <Row>
          <Col xs={12} md={6}>
            <Card.Img src={node.ImageStyle_thumbnail} className="img-fluid" />
          </Col>
          <Col xs={12} md={6} className="p-0">
            <Card.Body>
              <div className="card-title">{node.title}</div>
              <div className="date">
                {moment
                  .unix(node.last_update)
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CardComp;
