import React from 'react'
import { Button, Form } from 'react-bootstrap'

function Categoryform({handleSubmit, value, setValue}) {

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControllInput'>
                <Form.Control type='text' placeholder='Enter Category Name' value={value} onChange={(e)=>setValue(e.target.value)}/>

                <Button variant='primary ' type='submit'>Submit</Button>
            </Form.Group>
        </Form>
    </div>
  )
}

export default Categoryform