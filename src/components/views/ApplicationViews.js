import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={//default on home page
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />//from home page, if /tickets typed in, TicketList component will be displayed on screen
                <Route path="ticket/create" element={ <TicketForm /> } />
            </Route>
        </Routes>
    )
}

