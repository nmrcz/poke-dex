import React from 'react'
import { Spinner, Row, Col } from 'react-bootstrap'

const Loader = () => {
  return (
    <div 
        className='d-flex justify-content-center mt-5' 
        style={{ height: '100vh'}}
    >
        <Row>
            <Col>
                <Spinner
                    className='spinner-border spinner-border-lg text-light mx-4'
                    role='status'
                    style={{ height: '5vh', width: '5vh'}}
                >
                </Spinner>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{ color: 'white', fontSize: '2rem'}}>
                    Fetching Pokemon...
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Loader