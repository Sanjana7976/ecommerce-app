import React from 'react'
import { useAuth } from '../context/auth'
import { Card, Col, Container, Row } from 'react-bootstrap'
import UserMenu from '../assets/UserMenu'

function Dashboard() {

  const [auth] = useAuth()

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <UserMenu/>
          </Col>
          <Col md={9}>
            <h1>Your Profile</h1>
            <Card style={{width : '20rem'}} className='p-3 m-3'>
              <Card.Body>
                <h4>{auth?.user?.name}</h4>
                <h4>{auth?.user?.email}</h4>
                <h4>{auth?.user?.phone}</h4>
                <h4>{auth?.user?.address}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
