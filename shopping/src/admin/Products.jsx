import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import AdminMenu from "../assets/AdminMenu";

function Products() {

  const [products, setProducts] = useState([]);

  function getprods() {
    fetch("http://localhost:4001/api/product/getproducts").then((resp1) => {
        resp1.json().then((resp2) => {
          console.log(resp2);
          setProducts(resp2.product);
          console.log(products);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  useEffect(() => {
    getprods();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <Container>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((item, index) => {
                  return (
                    <Link
                      to={`/Dashboard/admin/Updateproduct/${item.slug}`}
                      key={item._id}
                      className="product-link"
                    >
                      <div className="col">
                        <Card style={{ width: "18rem" }} key={index}>
                          <Card.Img
                            variant="top"
                            className="w-100 mx-auto d-block"
                            src={`http://localhost:4001/api/product/getphoto/${item._id}`}
                          />
                          <Card.Body className="text-center">
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                              {item.description}

                              <h4>₹ {item.price}</h4>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Products;
