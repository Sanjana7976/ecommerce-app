import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function UserMenu() {
  return (
    <div>
      <ListGroup defaultActiveKey="#link1" className='m-3 p-3'>
        <h4 className='mt-4 mb-4'>User Panel</h4>
        <Link to='/Dashboard/user/Profile'> Profile </Link>
        <Link to='/Dashboard/user/Orders'> Users </Link>
      </ListGroup>
    </div>
  )
}

export default UserMenu
