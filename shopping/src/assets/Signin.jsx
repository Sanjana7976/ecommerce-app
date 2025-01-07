import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  function userlogin(e) {
    e.preventDefault();

    let user = { email, password };

    fetch("http://localhost:4001/api/auth/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res1) => {
        res1.json().then((res2) => {
          console.log(res2);
          setAuth({
            ...auth,
            user: res2.user,
            token: res2.token,
          });
          localStorage.setItem("login", JSON.stringify(res2));
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <Container>
        <Form className="mb-4 w-50 mx-auto" onSubmit={userlogin}>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Button
            variant="primary"
            onClick={() => navigate("/forgotpassword")}
            className="mx-auto d-block"
          >
            Forgot Password
          </Button>

          <Button variant="primary" type="submit" className="mx-auto d-block">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signin;
