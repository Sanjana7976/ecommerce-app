import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdminMenu from '../assets/AdminMenu'

function User() {
  return (
    <div>
      <Container fluid>
        <Row>
            <Col md={3}>
                <AdminMenu/>
            </Col>
            <Col md={9}>
                <h1>All Users</h1>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default User
