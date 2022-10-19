import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, isStaff }) => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser); 

//need the whole ticket object, b/c we area accessing the id, description, and emergency properties on the ticket, so Ticketlist needs to pass these props down to this child component in ticketObject.

    return <section className="ticket" key={ticketObject.id}>
              <header>
                {
                    isStaff
                        ?`Ticket ${ticketObject.id}`
                        :<Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
              </header>
              <section>{ticketObject.description}</section>
              <footer>Emergency: {ticketObject.emergency ? "🧨" : "No"}</footer>
            </section>
}
