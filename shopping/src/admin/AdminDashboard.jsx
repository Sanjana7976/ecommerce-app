import React from 'react'
import { useAuth } from '../context/auth'
import { Card, Col, Container, Row } from 'react-bootstrap'
import AdminMenu from '../assets/AdminMenu'

function AdminDashboard() {
    const [auth] = useAuth()

    return (
      <div>
        <Container fluid>
          <Row>
            <Col md={3}>
              <AdminMenu/>
            </Col>
            <Col md={3}>
              <Card style={{width : '20rem'}} className='p-3 m-3'>
                <Card.Body>
                  <h4>{auth?.user?.name}</h4>
                  <h4>{auth?.user?.email}</h4>
                  <h4>{auth?.user?.phone}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default AdminDashboard
