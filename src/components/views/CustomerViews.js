import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import "../nav/NavBar.css"
import { Profile } from "../Profile/Profile"
export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={//default on home page
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div className="view-subheader">Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />
                <Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="profile" element={ <Profile/> }/>
            </Route>
        </Routes>
    )
}

