import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import Loader from '../components/Loader'

const PokemoPage = ({ match }) => {
  const id = useParams().id
  const [pokemonDetails, setPokemonDetails] = useState()
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const getPokemon = async (id) =>{
      const details = await getPokemonData(id)
      setPokemonDetails(details.data)
      setLoading(false)
    }
  
    const getPokemonData = async (id) =>{
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      return res
    }
    getPokemon(id)
  }, [id])

  return (
    <>
      {loading ? (
        <Loader/>
      ):(
        <Row>
          <Col className='mx-auto' xs={8} sm={8} md={8} lg={8} xl={8}>
            <Card 
              className='my-3 p-3 rounded text-center shadow p-3 mb-3 bg-white'
              style= {{border: 'none', height: '20rem'}}
            >
              <Link to={`/pokemon/${pokemonDetails.id}`}>
                <Card.Img 
                    style={{ width: 'auto' }}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonDetails.id}.gif`}
                    variant='top'
                />
              </Link>
              <Card.Body
                className={`${pokemonDetails.types[0].type.name} rounded text-white `}>
                <Link to={`/pokemon/${pokemonDetails.id}`} className='link-name'>
                  <Card.Title as='div'>
                    #{pokemonDetails.id} {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}
                  </Card.Title>
                </Link>
              </Card.Body>
              
            </Card>
          </Col>
          
          <Col className='mx-auto' xs={8} sm={8} md={8} lg={8} xl={8}>
            <Card
              className='my-3 p-3 rounded text-center shadow p-3 mb-3 bg-white '
              style= {{border: 'none', height: '30rem'}}
            >
              <Card.Body>
                <Row>
                    {pokemonDetails.types.map(t =>(
                      <Col key={t.type.name}>
                        <div 
                          className = {`${t.type.name} rounded px-4 py-1`} 
                          style={{color: 'white'}}
                        >
                          {t.type.name.toUpperCase()}
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col>
                      <Card.Img style = {{width: '15rem'}} src={pokemonDetails.sprites.other.home.front_default}></Card.Img>
                      <Card.Text>Normal Form</Card.Text>
                    </Col>
                    <Col>
                      <Card.Img style = {{width: '15rem'}} src={pokemonDetails.sprites.other.home.front_shiny}></Card.Img>
                      <Card.Text>Shiny Form</Card.Text>
                    </Col>
                  </Row>
                  <Row className='mt-4'>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div
                        className='px-4 py-1 rounded'
                        style={{ border: '1px black solid'}}
                      >
                        Abilities
                      </div>
                    </Col>
                  </Row>
                  <Row className='text-center'>
                    {pokemonDetails.abilities.map(a => (
                      <Col key={a.ability.name} xs={6} sm={6} md={6} lg={6} xl={6}>
                        <div className='rounded px-4 py1'>
                          {a.ability.name.toUpperCase()}
                        </div>
                      </Col>       
                    ))}
                  </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default PokemoPage