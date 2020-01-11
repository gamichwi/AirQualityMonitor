import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getEPAEnvMonitoring = async () => {
    const response = await axios.get('https://www.epa.vic.gov.au/api/envmonitoring/sites?environmentalSegment=air');
    console.log(response, 'response');
    return response
}

const AirQuality = props => {
    const [counter, setCounter] = useState(0);
    const [header, setHeader] = useState('');
    const [sites, setSites] = useState([]);

    useEffect(() => {
        const EPA = getEPAEnvMonitoring()
        EPA.then((value) => {
            if (value.data) {
                setSites(value.data.records);
            }
        })
    }, [])
    
    useEffect(() => {
        console.log('useEffect in AirQuality')
    },[])

    const increment = () => {
        setCounter(counter + 1);
    }

    const handleChange = event => {
        setHeader(event.target.value);
    }

    return (
        <div className="air-quality-component">
        <h1>EPA - Air Quality</h1>
        <h2>{header}</h2>
        <h2>{counter}</h2>
        <button onClick={increment}>Increment</button>
        <input onChange={handleChange} />
        </div>
    )
}

export default AirQuality;