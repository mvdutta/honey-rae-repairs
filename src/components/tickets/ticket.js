import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser); 
//need the whole ticket object, b/c we area accessing the id, description, and emergency properties on the ticket, so Ticketlist needs to pass these props down to this child component in ticketObject.

//find the assigned employee for the current ticket
let assignedEmployee = null
if ( ticketObject.employeeTickets.length > 0){
//if the length of employeeTickets is >0, then an employee is working on it
const ticketEmployeeRelationship = ticketObject.employeeTickets[0]//only one employee can be assigned to a ticket at a time, so this array is only ever going to have 1 object in it. Can now use the foreign key (employeeId) on employeeTickets to find the full employee object
assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
}

//Find the employee profile object for the current user
const userEmployee = employees.find(employee => employee.userId === currentUser.id)

//function that determines if the current user can close the ticket
const canClose = () => {
    if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
        return <button onClick={closeTicket} classname="ticket__finish">Finish</button>
    } else {
        return ""
    }

}
//function that updates the ticket with a new date complete
const closeTicket = () => {
    const copy = {
        userId: ticketObject.id,
        description: ticketObject.description,
        emergency: ticketObject.emergency,
        dateCompleted: new Date()
    }
    return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers:{
            "Content-Type":"application/json"
            },
            body: JSON.stringify(copy)
            })
            .then(res => res.json())
            .then(getAllTickets())
        }

const buttonOrNoButton = () => {
    if (currentUser.staff) {
        return <button
        onClick={()=>{
            return fetch(`http://localhost:8088/employeeTickets`, {
            method: "POST",
            headers:{
            "Content-Type":"application/json"
            },
            body: JSON.stringify({
                employeeId: userEmployee.id,
                serviceTicketId: ticketObject.id
            })
            })
            .then(res => res.json())
            .then(() => {
                //GET state from the API again
                getAllTickets() 
             })
        }}
    >Claim</button>
    } else {
        return ""
    }
}

    return <section className="ticket" key={ticketObject.id}>
              <header>
                {
                    currentUser.staff
                        ?`Ticket ${ticketObject.id}`
                        :<Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
              </header>
              <section>{ticketObject.description}</section>
              <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
              <footer>
                {
                    ticketObject.employeeTickets.length
                    ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
                }
                {
                    canClose()
                }
              </footer>
            </section>
}
