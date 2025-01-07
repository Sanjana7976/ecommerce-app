import React from "react";
import { useSearch } from "../context/search";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Search() {
  const [values] = useSearch(); // Destructure only `values` if `setValues` is unused.

  return (
    <div>
      <h5 className="mb-4">
        {values?.result?.length < 1
          ? "No Products Found"
          : `Found ${values.result.length} Products`}
      </h5>
      <Container>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {values?.result?.map((item, index) => (
            <div className="col" key={item._id}> {/* Use item._id as key if unique */}
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  className="w-100 mx-auto d-block"
                  src={`http://localhost:4001/api/product/getphoto/${item._id}`}
                  alt={item.name}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                    <h4>₹ {item.price}</h4>
                  </Card.Text>
                  <Button variant="success">Add To Cart</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Search;
