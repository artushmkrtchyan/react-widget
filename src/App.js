import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactIframe from './IFrame';
import logo from './assets/logo.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Image = styled.img`
    width: 100px;
    height: auto;
    margin: 5px;
`;

function App(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.url) {
            setLoading(true);
            axios.get(props.url).then(setData).finally(setLoading(false));
        }
    }, []);

    return (
        <ReactIframe renderId={props.renderId}>
            <Wrapper>
                <Image src={logo} alt="image" />
                <div>React Widget Content</div>
            </Wrapper>
            <Wrapper>
                {loading ? (
                    'Loading...'
                ) : (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
            </Wrapper>
        </ReactIframe>
    );
}

export default App;
