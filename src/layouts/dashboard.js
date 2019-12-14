import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { Line, Scatter } from 'react-chartjs-2';
import moment from 'moment'
import _ from 'lodash'


const Dashboard = () => {

    const COLOR_ARR = ['rgba(200, 0, 0, 1)', 'rgba(0, 200, 0, 1)']
    const FILLCOLOR_ARR = ['rgba(200, 0, 0, 0.2)', 'rgba(0, 200, 0, 0.2)']
    const TYPE = {
        OPC: 'Outlet PC',
        NE: 'Newegg',
        CC: 'Canada Computers',
    }

    let [scrapeDataset, changeDataSet] = useState({ datasets: [] })
    let [suggestedMax, setSuggestedMax] = useState(0)
    let [itemLinks, setItemLinks] = useState({})


    const formatDatasets = resultsMap => {

        let tempDataObj = {}
        let tempMax = 0
        let newLinks = {}

        resultsMap.forEach(res => {

            let name = res.name.length > 10 ? res.name.substring(0, 10) : res.name
            name = name + ' (' + TYPE[res.type] + ')'

            if (newLinks[name] === undefined) {
                newLinks[name] = res.link
            }

            tempDataObj[name] = tempDataObj[name] ? tempDataObj[name] : []
            tempDataObj[name].push({
                x: res.createdAt,
                y: res.price,
            })

            tempMax = res.price < tempMax ? tempMax : res.price

        })

        setSuggestedMax(tempMax)
        setItemLinks(newLinks)

        let newDataset = {
            datasets: []
        }

        newDataset.datasets = Object.keys(tempDataObj).map((k, i) => {
            return {
                label: k,
                data: tempDataObj[k],
                showLine: true,
                fill: true,
                borderColor: COLOR_ARR[i],
                backgroundColor: FILLCOLOR_ARR[i]
            }
        })

        changeDataSet(newDataset)
    }

    useEffect(() => {
        Axios.get('/scrape-result')
            .then(res => {
                if (res.status !== 200 && res.status !== 201)
                    return null;
                formatDatasets(res.data)
            })
    }, {})

    return (
        <div style={{
            background: '#FFD700',
            minHeight: '100vh',
            maxWidth: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card style={{ width: '80%', height: '80%' }}>
                <Card.Header>
                    <h1>Dashboard, as of {moment().format('MMM DD, YYYY')}</h1>
                </Card.Header>
                <Card.Body>
                    <h3>Items at a glance</h3>
                    {
                        scrapeDataset.datasets.length > 0 &&
                        <ListGroup>
                            {scrapeDataset.datasets.map(d => {
                                return <ListGroupItem>
                                    <h5>{d.label}</h5>
                                    <Row>
                                        <Col md={4}><b>Current Price: </b>{d.data[d.data.length - 1].y}</Col>
                                        <Col md={4}><b>Original Price: </b>{d.data[0].y}</Col>
                                        <Col md={4}><a href={itemLinks[d.label]}>Link to item</a></Col>
                                    </Row>
                                </ListGroupItem>
                            })}
                        </ListGroup>
                    }
                    <h3 style={{ marginTop: '2em'}}>Your tracked prices over time</h3>
                    <div style={{ height: '400px' }}>
                        {
                            scrapeDataset.datasets.length > 0 &&
                            <Scatter data={scrapeDataset} options={
                                {
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    scales: {
                                        yAxes: [{
                                            gridLines: {
                                                color: "rgba(0, 0, 0, 0)",
                                            },
                                            ticks: {
                                                autoSkip: true,
                                                suggestedMax: suggestedMax + 10
                                            }
                                        }],
                                        xAxes: [{
                                            gridLines: {
                                                color: "rgba(0, 0, 0, 0)",
                                            },
                                            type: 'time',
                                            time: {
                                                displayFormats: {
                                                    quarter: 'MMM YYYY'
                                                }
                                            }
                                        }]
                                    }
                                }
                            } />
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dashboard