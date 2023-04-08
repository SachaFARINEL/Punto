import {store} from '../../app/store'
import {usersApiSlice} from "../users/usersApiSlice";
import {cardsApiSlice} from "../game/cards/cardsApiSlice";
import {useEffect} from "react";
import {Outlet} from "react-router-dom";

const Prefetch = () => {
    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const cards = store.dispatch(cardsApiSlice.endpoints.getCards.initiate())

        return () => {
            users.unsubscribe()
            cards.unsubscribe()
        }
    }, [])

    return <Outlet/>
}
export default Prefetch