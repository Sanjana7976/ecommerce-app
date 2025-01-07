import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    function changepassword(e) {
        e.preventDefault();
    
        let user = { email, newPassword, answer };
    
        fetch("http://localhost:4001/api/auth/forgotpassword", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
        .then((res1) => {
            res1.json().then((res2) => {
              console.log(res2);
              navigate("/Signin");
            });
        })
    }
    

  return (
    <div>
        <h1>Forgot Password</h1>
      <Container>
        <Form className="mb-4 w-50 mx-auto" onSubmit={changepassword}>
          
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
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGridAnswer">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mx-auto d-block">
            Reset
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Forgotpassword
