import Row from "./Row";
import dictionary from "./dictionary.json";
import answers from "./answers.json";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function repeatedCharacters(word: string): boolean {
    const characters: string[] = [];
    for (let i = 0; i < word.length; i++) {
        const character = word.charAt(i);
        if (characters.includes(character)) {
            return true;
        }
        characters.push(character);
    }
    return false;
}

export default function Board() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [word, setWord] = useState<string>(() => {
        while (true) {
            const protentialWord = answers[Math.floor(Math.random() * answers.length)];
            if (!repeatedCharacters(protentialWord)) {
                return protentialWord;
            }
        }
    });

    const [gameOver, setGameOver] = useState<boolean>(false);
    const [rows, setRows] = useState<any[]>([[], [], [], [], [], []]);
    const [states, setStates] = useState<any[]>([[], [], [], [], [], []]);
    const [rowStates, setRowStates] = useState<boolean[]>(Array(6).fill(false));
    const [activeRow, setActiveRow] = useState<number>(0);

    function addState(value: string) {
        setStates(last => {
            last[activeRow].push(value);
            return [...last]; // Returns a copy to force a re-render
        });
    }

    function clearState() {
        setStates(last => {
            last[activeRow] = [];
            return [...last];
        });
    }

    function keydown(event: KeyboardEvent) {
        if (!gameOver) {
            if (alphabet.includes(event.key.toLowerCase()) && rows[activeRow].length < 5 && !event.ctrlKey) {
                setRows((last) => {
                    last[activeRow].push(event.key.toUpperCase());
                    return [...last]; // Don't really know why but everything breaks if this doesn't return a copy
                });
                addState("full");
            } else if (event.key === "Enter") {
                if (rows[activeRow].length === 5) {
                    const guess = rows[activeRow].join('').toLowerCase();
                    if (dictionary.includes(guess) || answers.includes(guess)) {
                        clearState();
                        rows[activeRow].forEach((letter: string, i: number) => {
                            letter = letter.toLowerCase();
                            if (word.includes(letter)) {
                                if (word.indexOf(letter) === i) {
                                    addState("correct");
                                } else {
                                    if (repeatedCharacters(guess)) {
                                        // FIX repeated characters in guess both having a style
                                    }
                                    addState("present");
                                }
                            } else {
                                addState("wrong");
                            }
                        });
                        if (states[activeRow].every((e: string) => e === "correct")) {
                            // Win
                            clearState();
                            for (let i = 0; i < 5; i++) {
                                addState("correct finished");
                            }
                            setGameOver(true);
                        } else if (activeRow < 5) {
                            // Next line
                            setActiveRow(last => last + 1);
                        } else {
                            // Lose
                            setGameOver(true);
                        }
                    } else {
                        setRowStates(last => {
                            last[activeRow] = true;
                            return [...last];
                        });
                    }
                }
            } else if (event.key === "Backspace") {
                if (rowStates[activeRow]) {
                    // Remove invalid class if required
                    setRowStates(last => {
                        last[activeRow] = false;
                        return last;
                    });
                }
                setRows(last => {
                    last[activeRow].pop();
                    return last;
                });
                setStates(last => {
                    last[activeRow].pop();
                    return [...last];
                });
                // Only the last one of these needs to return a copy to re-render
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keydown);
        return () => {
            window.removeEventListener('keydown', keydown);
        };
    });

    return (
        <>
            <div className="board">
                {rows.map((row, i) => <Row key={i} data={row} states={states[i]} invalid={rowStates[i]} />)}
                <p style={{ textAlign: "center", visibility: `${gameOver ? "visible" : "hidden"}`, textTransform: "capitalize" }}>{word}</p>
            </div>
            <Keyboard rows={rows} states={states} />
        </>

    );
}