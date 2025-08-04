import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://otruyenapi.com/v1/api/the-loai");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSearch =(event)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("keyword");
    navigate(`/search?query=${query}`);
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-comic-app</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/trending/dang-phat-hanh">
                Đang phát hành
              </Nav.Link>
              <Nav.Link as={Link} to="/trending/hoan-thanh">
                Hoàn thành
              </Nav.Link>
              <Nav.Link as={Link} to="/trending/sap-ra-mat">
                Sắp ra mắt
              </Nav.Link>
              <NavDropdown title="Thể loại" id="basic-nav-dropdown">
                  {data?.data?.items && data?.data?.items.length > 0 ? (data?.data?.items.map((item,index)=>(
                    <NavDropdown.Item as={Link} to={`/genre/${item.slug}`}>
                        {item.name}
                    </NavDropdown.Item>
                  ))):(
                    <NavDropdown.Item as={Link} to="/">
                        Newest
                    </NavDropdown.Item>
                  )}
              </NavDropdown>
              <Form inline autoComplete="off" method="get" onSubmit={handleSearch}>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      name="keyword"
                      placeholder="Search"
                      className=" mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
