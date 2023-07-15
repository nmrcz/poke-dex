import React, { useState, useEffect } from 'react'
import { Card, Modal, Col, Row, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Pokemon = ({ pokemon }) => {
    const [over, setOver] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [pokeSpeci, setPokeSpeci] = useState()

    const findEngText = (entry) => {
        if (entry !== undefined){
            for (let i = 0; (i < entry.data.flavor_text_entries.length);i++){
                if (entry.data.flavor_text_entries[i].language.name === 'en'){
                    return entry.data.flavor_text_entries[i].flavor_text
                }
            }
        }
        return
    }

    const secondary_type = () => {
        return(
        <>
            <img 
                alt=''
                src={`${process.env.PUBLIC_URL}/assets/pokemon_type_icons/${pokemon.types[1].type.name}.png`}
                className="img-fluid p-1"
                style={{
                    width: '2rem'
                }}
            />
        </>
        )
    }
    
    useEffect(()=>{
        const getPokemonData = async () => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
            setPokeSpeci(res)
            return
        }
        getPokemonData()
    },[pokemon.id])   

    return (
    <div>
        <Card id="card" className='my-3 p-3 mb-4 rounded text-left border-0'>
            <div 
                className="h1"
                style={{
                    fontSize: 'calc(1rem + 0.3vw)',
                    color: 'lightgray',
                    zIndex: '100',
                    position: 'absolute',
                }}
                >No. {pokemon.id}
            </div>
            <div className='d-flex justify-content-end'>
                <Image                        
                    src={over ? `${process.env.PUBLIC_URL}/assets/shiny-icon.png` : null}
                    className="img-fluid"
                    style={{
                        position: 'absolute',
                        width: '3rem',
                    }}
                />
            </div>
            <Link>
                <div
                    onMouseOver={() => setOver(true)}
                    onMouseOut={() => setOver(false)}
                    onClick={handleShow}
                >
                    <Card.Img 
                        className="img-fluid"
                        style={{ 
                            width: '16rem',
                            position: 'relative',
                            zIndex: '2',
                            left: '50%',
                            transform: 'translate(-50%, 0%)',
                        }}
                        src={over ? pokemon.sprites.other.home.front_shiny : pokemon.sprites.other.home.front_default} variant ='top'
                    />                   
                </div>
            </Link>
            <Card as='div'
                className={`${pokemon.types[0].type.name} rounded-circle img-fluid h-50 w-50`}
                        style={{
                            width:'8rem', 
                            height:'8rem', 
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: '1',
                            filter: 'blur(1.75rem)',
                            }}>
            </Card>
            <Card.Body 
                className='rounded text-white pl-3 pt-1'
                style={{
                    height: '2.5rem',
                    backgroundColor: '#36616e', 
                    zIndex: '2',
                    position: 'relative'
                    }}>
                <Link className='link-name'>
                    <Card.Title as='div'
                        onClick={handleShow}
                        className='d-flex justify-content-center text-truncate block'
                        style={{
                            fontSize: 'calc(1rem + 0.3vw)',
                        }}>
                        {pokemon.name.replace((/(?<=\b)\w/g), match => match.toUpperCase())}
                        
                        <img 
                        alt=''
                            src={`${process.env.PUBLIC_URL}/assets/pokemon_type_icons/${pokemon.types[0].type.name}.png`}
                            className="img-fluid p-1"
                            style={{
                                width: '2rem'
                            }}
                        />
                        { pokemon.types.length > 1 ? secondary_type() : ''}
                        
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>



        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Container>
                <Modal.Title className="text-center" style={{fontSize: '3rem'}}>
                    No. {pokemon.id} - {pokemon.name.replace((/(?<=\b)\w/g), match => match.toUpperCase())}
                </Modal.Title>
            </Container>
          </Modal.Header>

          <Modal.Body className="show-grid ">
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className='p-2 align-self-center'>
                        <Row>
                        <Image
                            alt=''
                            className="img-fluid align-self-center"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
                            style={{
                                width: '10rem',
                                position: 'relative',
                                left: '50%',
                                transform: 'translate(-50%, 0%)',
                                marginBottom: '1rem'
                            }}
                        />
                        </Row>
                        <Row>
                            
                        </Row>

                    </Col>

                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Row className="text-center">
                            <h4>{pokeSpeci !== undefined ? pokeSpeci.data.genera[7].genus : null}</h4>
                        </Row>
                        <Row className="d-flex">
                            {pokemon.types.map(t =>(
                            <Col as='div' key={t.type.name}>
                                <div 
                                className = {`${t.type.name} rounded d-flex justify-content-center text-truncate block pb-3 h-50`} 
                                >
                                <p style={{color: 'white', 
                                fontSize: '1.25rem'}}>
                                    {t.type.name.toUpperCase()}
                                </p>

                                <img 
                                    alt=''
                                    src={`${process.env.PUBLIC_URL}/assets/pokemon_type_icons/${t.type.name}.png`}
                                    className="img-fluid p-1"
                                    style={{
                                        width: '2rem',
                                        height: '2rem'
                                        
                                    }}
                                />
                                </div>
                            </Col>
                            ))}
                        </Row>
                        <Row className='justify-content-center border mb-2 pb-3'>
                            <Col className="d-flex justify-content-center pt-3" xs={10} sm={10} md={8} lg={8} xl={8}>
                                <h5>Abilities</h5>
                                
                            </Col>
                            {pokemon.abilities.map(a => (
                            <Col className="d-flex justify-content-center" key={a.ability.name} xs={10} sm={10} md={8} lg={8} xl={8}>
                                <div className='rounded px-4 py1'>
                                {a.ability.name.toUpperCase()}
                                </div>
                            </Col>       
                            ))}
                        </Row>
                        <Row className="d-flex justify-content-center border">
                            <Col as='div' className="d-flex justify-content-center pt-3">
                                <p>Height: {pokemon.height / 10} m</p>
                            </Col>
                            <Col as='div' className="d-flex justify-content-center pt-3">
                                <p>Weight: {pokemon.weight / 10} kg</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Container>
                <Row>
                    <Col xs={18} md={12}>
                        <p>{pokeSpeci !== undefined ? findEngText(pokeSpeci) : null}</p>
                    </Col>
                </Row>
            </Container>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Pokemon