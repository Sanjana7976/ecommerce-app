import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import UserMenu from "../assets/UserMenu";
import { useCart } from "../context/cart";
function Orders() {
  const [cart] = useCart();
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <h1 className="text-center">All Orders</h1>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((c) => {
                  return (
                    <tr>
                      <td>
                        <img
                          className="mx-auto d-block"
                          src={`http://localhost:4001/api/product/getphoto/${c._id}`}
                          alt=""
                          height={100}
                          width={100}
                        />
                      </td>
                      <td>{c.name}</td>
                      <td>{c.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Button
              variant="success"
              className="mt-4 mb-5 mx-auto d-block fs-4"
            >
              Place Order
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Orders;
