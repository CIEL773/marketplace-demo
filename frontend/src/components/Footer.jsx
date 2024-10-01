import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaHome, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid className="py-3 border-top bg-light fixed-bottom">
      <Row className="align-items-center">
        {/* Left Side: Home Icon and Company Info */}
        <Col xs={6} md={4} lg={9} className="d-flex align-items-center">
          <a
            href="/"
            className="me-2 text-body-secondary text-decoration-none lh-1"
          >
            <FaHome size={24} /> {/* Home Icon */}
          </a>
          <span className="text-body-secondary">&copy; 2024 Company, Inc</span>
        </Col>

        {/* Right Side: Social Media Icons */}
        <Col xs={6} md={4} lg={3} className="d-flex justify-content-end">
          <Nav as="ul" className="list-unstyled d-flex">
            <Nav.Item as="li" className="ms-3">
              <Nav.Link
                href="https://x.com/"
                className="text-body-secondary p-0"
              >
                <FaTwitter size={24} /> {/* Twitter Icon */}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="ms-3">
              <Nav.Link
                href="https://www.instagram.com/"
                className="text-body-secondary p-0"
              >
                <FaInstagram size={24} /> {/* Instagram Icon */}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="ms-3">
              <Nav.Link
                href="https://www.facebook.com/"
                className="text-body-secondary p-0"
              >
                <FaFacebook size={24} /> {/* Facebook Icon */}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
