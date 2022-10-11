import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, setTicket] = useState({
        description: "",
        emergency: false

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
       const ticketToSendToAPI = {
        //can get userId from honeyUserObject:
            userId: honeyUserObject.id,
        //can get description and emergency from the ticket state variable above:
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""

       }
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/tickets")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}//making a copy of ticket (state)
                                copy.description = evt.target.value//here we are changing just the description property of that in the copy only from the user input
                                setTicket(copy)//makes sure that the ticket is updated to the latest version
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}//making a copy of ticket (state)
                                copy.emergency = evt.target.checked//here we are changing just the description property of that in the copy only from the user input
                                setTicket(copy)//makes sure that the ticket is updated to the latest version
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}