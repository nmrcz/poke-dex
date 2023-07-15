import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Pokemon from './Pokemon'
import Loader from './Loader'

const PokemonList = ({ pokemonList, loading }) => {
    const [pokemonData, setPokemonData] = useState([])
    const [loader, setLoader] = useState(false)


    useEffect(()=>{
        const getPokemonList = async () => {
            var startTime = performance.now()
            let arr = []
            setLoader(true)
    
            const promises = pokemonList.map(async p => {
                const res = await getPokemonData(p)
                arr.push(res)
                return res
            })

            const result = await Promise.all(promises)
            setLoader(false)
            var endTime = performance.now()
            setPokemonData(result)
            console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
        }
    
        const getPokemonData = async (id) => {
            const res = await axios.get(`${id}`)
            return res
        }
        
        getPokemonList()
    },[pokemonList])
    
    return(
        <>
            {loader ? (
                <Loader/>
            ):(
                <Row className='bg-white my-4'
                    style = {{
                        borderRadius: '2rem'
                    }}>
                    {pokemonData.map(p => (
                        <Col key={p.data.name} xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Pokemon pokemon={p.data}/>
                        </Col>
                    ))}
                </Row>     
            )}
        </>
    )
}

export default PokemonList