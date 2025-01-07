import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserMenu from "../assets/UserMenu";
import { useAuth } from "../context/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  let token = auth.token;
  useEffect(() => {
    console.log(auth);
    const { name, email, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);
  function handleSubmit(e) {
    e.preventDefault();
    let user = { name, email, password, phone, address };
    fetch("http://localhost:4001/api/auth/profile", {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(user),
    }).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        setAuth({ ...auth, user: res2?.updatedUser });
        let ls = localStorage.getItem("login");
        ls = JSON.parse(ls);
        ls.user = res2.updatedUser;
        localStorage.setItem("login", JSON.stringify(ls));
        navigate("/Dashboard/user");
      });
    });
  }
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <h1>Your Profile</h1>
            <Container>
              <Form className="mb-4 w-50 mx-auto" onSubmit={handleSubmit}>
                <Form.Group controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder="Enter City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mx-auto d-block"
                >
                  Update
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
