import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import {apiSlice} from "../../../app/api/apiSlice"
import {usersApiSlice} from "../../users/usersApiSlice";

const cardsAdapter = createEntityAdapter({})

const initialState = cardsAdapter.getInitialState()

export const cardsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCards: builder.query({
            query: () => '/cards',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCards = responseData.map(card => {
                    card.id = card._id
                    return card
                });
                return cardsAdapter.setAll(initialState, loadedCards)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Card', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Card', id}))
                    ]
                } else return [{type: 'Card', id: 'LIST'}]
            }
        }),
        shuffleAndDistribute: builder.query({
            query: numPlayers => `/cards/shuffleAndDistribute?players=${numPlayers}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        })
    }),
})

export const {
    useShuffleAndDistributeQuery,
} = cardsApiSlice
// returns the query result object
export const selectCardsResult = cardsApiSlice.endpoints.getCards.select()

// creates memoized selector
const selectCardsData = createSelector(
    selectCardsResult,
    cardsResult => cardsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCards,
    selectById: selectCardById,
    selectIds: selectCardIds
    // Pass in a selector that returns the users slice of state
} = cardsAdapter.getSelectors(state => selectCardsData(state) ?? initialState)