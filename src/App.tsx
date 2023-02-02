import React from 'react';
import styled from 'styled-components';
import './App.css';

function App() {
    return (
        <OutsideGrid>
            <div style={{ gridColumn: 1, gridRow: 1 }} />
            <div
                style={{
                    gridColumn: 2,
                    gridRow: 1,
                    textAlign: 'center'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr'
                }}>
                    <Flex
                        justifyContent='flex-start'
                        alignItems='center'
                        bg='yellow'
                    >
                        <p>Increase word size</p>
                    </Flex>
                    <h1 style={{ fontSize: '3rem', margin: 0 }}>
                        Lingo
                    </h1>
                    <Flex
                        justifyContent='flex-end'
                        alignItems='center'
                        bg='red'
                    >
                        <p>Next word</p>
                    </Flex>
                </div>
            </div>
            <div style={{ gridColumn: 3, gridRow: 1 }} />
        </OutsideGrid >
    );
}

const Flex = styled.div`
display: flex;
justify-content: ${(props: any) => props.justifyContent};
align-items: ${(props: any) => props.alignItems};
background-color: ${(props: any) => props.bg};
`

const OutsideGrid = styled.div`
background-color: #45b3e0;
height: 100%;

display: grid;
grid-template-columns: 1fr min(100%, 800px) 1fr;
grid-template-rows: 1fr;
`;

export default App;
