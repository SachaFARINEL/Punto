import {store} from '../../app/store'
import {usersApiSlice} from "../users/usersApiSlice";
import {cardsApiSlice} from "../game/cards/cardsApiSlice";
import {useEffect} from "react";
import {Outlet} from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const cards = store.dispatch(cardsApiSlice.endpoints.getCards.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            cards.unsubscribe()
        }
    }, [])

    return <Outlet/>
}
export default Prefetch