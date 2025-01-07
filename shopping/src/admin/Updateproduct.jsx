import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminMenu from "../assets/AdminMenu";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/auth";
import { useNavigate, useParams } from "react-router-dom";

function Updateproduct() {


  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [id, setId] = useState(null)
  const params = useParams()
  const [auth] = useAuth();
  const token = auth.token;
  const navigate = useNavigate();

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

  function getsingleprod(){

    fetch(`http://localhost:4001/api/product/getsingleproduct/${params.slug}`).then((res1)=>{
        res1.json().then((res2)=>{
            console.log(res2.product)
            console.log(res2.product.category)
            setName(res2.product.name)
            setPrice(res2.product.price)
            setDescription(res2.product.description)
            setQuantity(res2.product.quantity)
            setId(res2.product._id)
            setCategory(res2.product.category._id)
        })
    })
  }

  useEffect(() => {
    getsingleprod();
  }, []);

  function editproduct(e) {
    e.preventDefault();
    const prod = new FormData();
    prod.append("name", name);
    prod.append("description", description);
    prod.append("price", price);
    prod.append("quantity", quantity);
    photo && prod.append("photo", photo);
    prod.append("category", category);
    console.log(prod);

    fetch(`http://localhost:4001/api/product/update/${id}`, {
      method: "put",
      headers: {
        // "Accept":'application/json',
        // "Content-Type":"application/json",
        "authorization": token,
      },
      body: prod,
    }).then((resp1) => {
      resp1
        .json()
        .then((resp2) => {
          console.log(resp2);
          getprods();
          navigate("/Dashboard/admin/Products");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  function getprods() {
    fetch("http://localhost:4001/api/product/getproducts").then((resp1) => {
      resp1
        .json()
        .then((resp2) => {
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

  function delprod(id){
    fetch(`http://localhost:4001/api/product/delete/${id}`,{
        method:"delete"
    }).then((res1)=>{
        res1.json().then((res2)=>{
            console.log(res2)
            navigate("/Dashboard/admin/Products");
        })
    })
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <Container>
              <h1 className="mt-4 text-center">Edit Product</h1>
              <Form onSubmit={(e) => editproduct(e)}>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  name={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                
                  {categories?.map((c) => {
                    return (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Product Name:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={2}>
                    Price:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Quantity:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Description:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Product Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </Form.Group>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product"
                        height={"200px"}
                        className="img-fluid"
                      />
                    </div>
                  )}
                </div>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="mb-4">
                      Update Product
                    </Button>
                    <Button type="submit" className="ms-4 mb-4" variant="danger" onClick={()=>delprod(id)}>
                      Delete Product
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Updateproduct;
