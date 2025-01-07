import React, { useState, useEffect, useReducer } from "react";
import { useAuth } from "../context/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Prices } from "./Prices";
import { useCart } from "../context/cart";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth();

  function getprods() {
    fetch("http://localhost:4001/api/product/getproducts").then((res1) => {
      res1
        .json()
        .then((res2) => {
          console.log(res2);
          setProducts(res2.product);
          console.log(products);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getprods();
    }
  }, [checked.length, radio.length]);

  function filterProduct() {
    let data = { checked, radio };

    fetch("http://localhost:4001/api/product/filter", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        setProducts(res2.product);
        console.log(products);
      });
    });
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      filterProduct();
    }
  }, [checked.length, radio.length]);

  function handleFilter(value, id) {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  }

  function getAllCategory() {
    fetch("http://localhost:4001/api/category/getcategory").then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
        setCategories(res2.category);
      });
    });
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <Row className="mt-4">
        <Col md={2}>
          <h5 className="mb-3">Filter By Category</h5>

          {categories?.map((c) => {
            return (
              <Form.Check
                type="checkbox"
                key={c._id}
                label={c.name}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              />
            );
          })}
          <h5 className="mb-3 mt-3">Filter By Prices</h5>
          {Prices?.map((p) => {
            return (
              <Form.Check
                type="radio"
                key={p._id}
                name="r1"
                label={p.name}
                value={p.array}
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
                // onChange={(e)=>handleFilter(e.target.checked,p._id)}
              />
              //   <div className='d-flex' key={p._id}>
              //   <input type='radio' name="r1" value={p.array} onChange={(e)=>setRadio(e.target.value)} className='form-check'/>
              //    <label className='form-check-label'> {p.name}</label>
              // </div>
            );
          })}
          <Button
            variant="info"
            className="mt-3"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </Button>
        </Col>
        <Col md={9}>
          <h3 className="text-center">All Products</h3>
          <Container>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products?.map((item, index) => {
                return (
                  <div className="col" key={index}>
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
                        <Button
                          variant="success"
                          onClick={() => {
                            setCart([...cart, item]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, item])
                            );
                          }}
                        >
                          Add To Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
