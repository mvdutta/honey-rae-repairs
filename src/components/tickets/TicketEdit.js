import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, setTicket] = useState({
        description: "",
        emergency: false

    })
    const { ticketId } = useParams()
    //redirect user to the ticket list
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(res => res.json())
        .then((data) => {
            setTicket(data)
        })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/tickets")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit Service Ticket</h2>
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
                        checked={ticket.emergency}
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
                Save Edits
            </button>
        </form>
    )
}