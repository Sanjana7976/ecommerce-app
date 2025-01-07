import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

function Cartitems() {

  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price;
    });
    return total;
  };

  function removecartitem(cid) {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === cid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  }
  
  return (
    <div>
      <Container>
        <h1 className="text-center p-3 mb-2">{`Hello ${
          auth?.token && auth?.user?.name
        }`}</h1>
        <h4 className="text-center">
          {cart?.length > 1
            ? `You have ${cart.length} items in your cart ${
                auth.token ? "" : "Please Login to Checkout"
              }`
            : "Your cart is empty"}
        </h4>
        {auth.token ? (
          <Row className="mb-4">
            <Col md={9}>
              <table className="table">
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
                            src={`http://localhost:4100/api/product/getphoto/${c._id}`}
                            alt=""
                            height={100}
                            width={100}
                          />
                        </td>
                        <td>{c.name}</td>
                        <td>{c.price}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => removecartitem(c._id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
            <Col md={3}>
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: ₹ {totalPrice()}</h4>
              <Button
                variant="success"
                className="mt-4"
                onClick={() => navigate("/Dashboard/user/Orders")}
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default Cartitems;
