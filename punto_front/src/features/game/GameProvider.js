import React, {useEffect, useState} from 'react';
import {useShuffleAndDistributeQuery} from './cards/cardsApiSlice';
import {createGridArray} from "./gridUtils";

const GameContext = React.createContext();

const useGame = () => {
    const {data, isLoading, isError} = useShuffleAndDistributeQuery(2);
    const [deck, setDeck] = useState([]);
    const [cardInHand, setCardInHand] = useState(null);
    const [grid, setGrid] = useState(createGridArray());

    useEffect(() => {
        const fillDeck = async () => {
            if (!isLoading && !isError && data && data.firstDeck) {
                setDeck(data.firstDeck);
            }
        };
        fillDeck();
    }, [data, isLoading, isError]);

// Initialiser la carte en main avec la première carte du deck
    useEffect(() => {
        if (deck.length > 0 && !cardInHand) {
            setCardInHand(Object.assign({}, deck[0]));
        }
    }, [deck, cardInHand]);

    useEffect(() => {
        setCardInHand(Object.assign({}, deck[0]))
    }, [deck]);

    const updateGrid = (x, y, card) => {
        setGrid((grid) =>
            grid.map((square) =>
                square.position.x === x && square.position.y === y
                    ? {...square, card: Object.assign({}, card)}
                    : square
            )
        );
    };

    const updateHand = () => {
        setCardInHand(Object.assign({}, deck[1]));
        setDeck((deck) => {
            const newDeck = deck.slice(1);
            return newDeck;
        });
    };

    const getCardInHand = () => {
        return cardInHand;
    };

    return {deck, grid, cardInHand, updateHand, updateGrid};
};

const GameProvider = ({children}) => {
    const game = useGame();

    return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
    const game = React.useContext(GameContext);
    if (!game) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return game;
};

export {GameProvider, useGameContext};
