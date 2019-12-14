import React, { useState } from 'react'
import { Row, Col, ListGroup, Card, ListGroupItem, Button } from 'react-bootstrap'
import Axios from 'axios'
const SCRAPE_TYPES = {
    CC: 'Canada Computers',
    NE: 'Newegg',
    OPC: 'Outlet PC'
}

const Home = () => {

    let [scrapeResults, setScrapeResults] = useState([])
    let [searchTerms, setSearchTerms] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [scrapeTypes, setScrapeTypes] = useState({
        CC: true,
        NE: true,
        OPC: true,
    })

    const searchTermChangeHandler = e => {
        setSearchTerms(e.target.value)
    }

    const handleTypeChange = (e, type) => {
        let newScrapeTypes = { ...scrapeTypes }
        newScrapeTypes[type] = e.target.checked
        setScrapeTypes(newScrapeTypes)
    }

    const handleSearch = async () => {
        setIsLoading(true)
        let finalResult = []
        let body = { item_name: searchTerms }
        let endpoint = '/scrape-result/one-time'
        if (scrapeTypes['CC']) {
            let ccResults = await Axios.post(endpoint, { ...body, scrape_type: "CC" })
                .then(res => res.data)
                .then(res => res.map(cc => { return { ...cc, type: 'CC' } }))
                .catch(e => {
                    console.error(e)
                    return []
                })
            finalResult = finalResult.concat(ccResults)
        }

        if (scrapeTypes['NE']) {
            let neResults = await Axios.post(endpoint, { ...body, scrape_type: "NE" })
                .then(res => res.data)
                .then(res => res.map(ne => { return { ...ne, type: 'NE' } }))
                .catch(e => {
                    console.error(e)
                    return []
                })

            finalResult = finalResult.concat(neResults)
        }
        // if (scrapeTypes['OPC']) {
        //     finalResult = finalResult.concat(
        //         await Axios.post(endpoint, { ...body, scrape_type: "OPC" })
        //             .then(res => res.data)
        //             .catch(e => {
        //                 console.error(e)
        //                 return []
        //             })
        //     )
        // }
        setIsLoading(false)
        setScrapeResults(finalResult)
    }

    return (
        <div style={{
            background: 'rgb(21, 97, 173)',
            minHeight: '100vh'
        }}>
            <Row style={{ padding: '10%', paddingTop: '8%' }}>
                <Col md={12} className='mb-3'>
                    <h1 style={{color: 'rgb(251, 249, 246)'}}>Welcome to TechCost.</h1>
                    <h2 style={{color: 'rgb(251, 249, 246)'}}>We make finding tech easy!</h2>
                </Col>
                <Col md={3} sm={12}>
                    <Card className='mb-2'>
                        <Card.Body>
                            <h2>Search for an item</h2>
                            <input disabled={isLoading} value={searchTerms} onChange={searchTermChangeHandler} style={{ width: '100%', padding: '0.5rem' }} placeholder='Enter an item name'></input>
                            <Button disabled={isLoading || searchTerms.length <= 1} onClick={handleSearch} block className='mt-2'>Search</Button>
                            <p><b><br />Select which sites to scrape from:</b></p>
                            {
                                Object.keys(SCRAPE_TYPES).map(st =>
                                    <div style={{ display: 'flex', justifyContent: 'left' }}><p><input onChange={e => handleTypeChange(e, st)} checked={scrapeTypes[st]} className='mt-2' type='checkbox' />{' ' + SCRAPE_TYPES[st]}</p></div>
                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
                {scrapeResults &&
                    <Col md={9} sm={12}>
                        <Card className='mb-2'>
                            <Card.Header>
                                {
                                    isLoading ?
                                        <div>
                                            <h1>Loading...</h1>
                                            <p>Fetching results from the web</p>
                                        </div> :
                                        <div>
                                            <h1>Your search results:</h1>
                                            <p>Found {scrapeResults.length} result(s)</p>
                                            {scrapeResults.length >= 0 && <p>Make an account to continuously log this data.</p>}
                                        </div>
                                }
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {
                                        scrapeResults.map((sr, i) =>
                                            <ListGroupItem key={i}>
                                                <Row>
                                                    <Col md={10} sm={12}>
                                                        <p><b>Price:</b> {' $' + sr.price}</p>
                                                        <p><b>From Website:</b> {SCRAPE_TYPES[sr.type]}</p>
                                                        <p><b>Listed Name:</b> {sr.name}</p>
                                                    </Col>
                                                    <Col md={2} sm={12}>
                                                        <Button block variant='outline-success'>Watch this item</Button>
                                                        <Button block href={sr.link} variant='outline-info'>Link to Item</Button>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )
                                    }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                }
            </Row>
        </div>
    )
}

export default Home