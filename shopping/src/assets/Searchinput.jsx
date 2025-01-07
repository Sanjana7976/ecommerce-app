import React from "react";
import { useSearch } from "../context/search";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function Searchinput() {

  const [values, setValues] = useSearch()
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4001/api/product/search/${values.keyword}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      setValues({ ...values, result: data });
      navigate("/Search");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}> {/* Removed `inline` as it's not supported in newer Bootstrap */}
        <Row>
          <Col xs="auto">
            <Form.Control
              type="search"
              placeholder="Search"
              value={values?.keyword || ""} // Add default value to handle undefined
              className="mr-sm-2"
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Searchinput;
