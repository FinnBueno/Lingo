import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { words } from './Words';

function App() {
    const [wordSize, setWordSize] = useState(+(localStorage.getItem('wordSize') || '5'));

    useEffect(() => {
        console.log('Version 1.3');
    }, []);

    useEffect(() => {
        setWord(newWord());
    }, [wordSize]);

    const decreaseWordSize = () => {
        if (wordSize <= 5) return;
        const newWordSize = wordSize - 1;
        setWordSize(newWordSize);
        localStorage.setItem('wordSize', `${newWordSize}`);
    }

    const increaseWordSize = () => {
        const newWordSize = wordSize + 1;
        setWordSize(newWordSize);
        localStorage.setItem('wordSize', `${newWordSize}`);
    }

    const [guesses, setGuesses] = useState<string[]>([]);

    const newWord = () => {
        let potentialWord;
        do {
            const list = words[wordSize];
            potentialWord = list[Math.floor(Math.random() * list.length)];
            const usedWords = localStorage.getItem('usedWords' + wordSize) || '';
            if (usedWords.includes(potentialWord + ',')) {
                potentialWord = undefined;
            }
        } while (!potentialWord);
        const usedWords = localStorage.getItem('usedWords' + wordSize) || '';
        localStorage.setItem('usedWords' + wordSize, usedWords + potentialWord + ',');

        return potentialWord;
    }

    const [word, setWord] = useState(newWord());

    const guess = () => {
        if (guesses.length >= 5) return;
        const guessValue: string = (document.getElementById('guessField') as any).value;
        if (!guessValue) return;
        setGuesses([
            ...(guesses || []),
            guessValue
        ]);
    }

    const calculateColor = (rowNr: number, colNr: number) => {
        if (colNr == 0) return '#d46934';
        const currentGuess = guesses[rowNr];
        if (currentGuess[colNr] === word[colNr]) {
            return '#d46934';
        }
        // left in correct word
        const left = [...word];
        for (let i = 0; i < word.length; i++) {
            if (left[i] == currentGuess.toLowerCase()[i]) {
                left[i] = '.';
            }
        }
        return left.includes(currentGuess[colNr]) ? '#d4a934' : '#2593c0';
    }

    return (
        <OutsideGrid>
            <div style={{ gridColumn: 1, gridRow: 1 }} />
            <div
                style={{
                    gridColumn: 2,
                    gridRow: 1,
                    textAlign: 'center',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: 'auto 1fr'
                }}
            >
                <div style={{
                    display: 'grid',
                    gridRow: 1,
                    gridColumn: 1,
                    gridTemplateColumns: '1fr 1fr 1fr',
                    padding: '24px 0',
                }}>
                    <Flex
                        justifyContent='flex-start'
                        alignItems='center'
                    >
                        <Button onClick={decreaseWordSize}>
                            -
                        </Button>
                        <p style={{ margin: '0 12px' }}>
                            <b>
                                {wordSize}
                            </b>
                        </p>
                        <Button onClick={increaseWordSize}>
                            +
                        </Button>
                    </Flex>
                    <h1 style={{ fontSize: '3rem', margin: 0 }}>
                        Lingo
                    </h1>
                    <Flex
                        justifyContent='flex-end'
                        alignItems='center'
                    >
                        <Button onClick={() => {
                            setGuesses([]);
                            setWord(newWord());
                        }}>
                            Nieuw woord
                        </Button>
                    </Flex>
                </div>
                <div style={{
                    gridColumn: 1,
                    gridRow: 2,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${wordSize}, 1fr)`,
                    gridTemplateRows: `repeat(${7}, 2fr) 1fr`
                }}>
                    {[...Array(7).keys()].map(rowNr =>
                        [...Array(wordSize).keys()].map(colNr => rowNr !== 5 ? (
                            <Cell
                                key={rowNr + '-' + colNr}
                                style={{
                                    backgroundColor: colNr == 0 && rowNr <= guesses.length ? '#d46934' : rowNr >= guesses.length ? '#2593c0' : calculateColor(rowNr, colNr),
                                    gridColumn: colNr + 1,
                                    gridRow: rowNr + 1
                                }}
                            >
                                <Letter>
                                    {rowNr <= guesses.length && colNr == 0 && word[0].toUpperCase()}
                                    {guesses.length > rowNr && colNr != 0 ? guesses[rowNr][colNr].toUpperCase() : ''}
                                    {guesses.length >= 5 && rowNr == 6 && word[colNr].toUpperCase()}
                                </Letter>
                            </Cell>
                        ) : (
                            <div />
                        ))
                    )}
                    <div style={{
                        gridColumn: `1 / span ${wordSize}`,
                        gridRow: 8,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px'
                    }}>
                        <input type='text' id='guessField' style={{
                            flexGrow: 1,
                            fontSize: '2rem',
                            borderRadius: '8px',
                            margin: '0 24px 0 0',
                            padding: '0 4px'
                        }} />
                        <Button onClick={guess}>
                            Raad!
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ gridColumn: 3, gridRow: 1 }} />
        </OutsideGrid >
    );
}

const Letter = styled.p`
font-weight: bold;
font-size: 4rem;
margin: 0;
`;

const Cell = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 12px;
background-color: #2593c0;
cursor: pointer;
`;

const Button = styled.button`
background-color: #2593c0;
border: none;
font-size: 2rem;
cursor: pointer;
border-radius: 8px;
&:active {
    transform: translateY(5px);
}
`;

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
