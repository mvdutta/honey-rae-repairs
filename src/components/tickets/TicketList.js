import { toContainElement } from "@testing-library/jest-dom/dist/matchers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets.css";
/*useState is used to register a certain variable with React so it keep track of it and change the DOM when changes are made to the variable via the setter function. To register the variable tickets, with an initial value of [], we do the following: call useState with the initial value (the empty array). Then useState will give us an array with 2 things in it: the first is our variable tickets, and the second is a setter function for our variable which allows us to make any changes to the variable. Both of these are obtained by using array destructuring. The above code is equivalent to the following: 
const variableAndSetter = useState([])
const tickets = variableAndSetter[0]
const setTickets = variableAndSetter[1]...these 3 lines are condensed to one line in the line of code above
*/

/*
useEffect() is a function that allows you to observe state and run some instructions shen state changes. It takes in 2 parameters. The first is a function and the second is an array called the dependency array. If the array is left empty, the function (the first parameter) will be run only when the component loads. If any state variables are put inside the array(like tickes above), then the component will be re-rendered whenever any of these variables change. 

useEffect()can be used to do jobs that are not related to rendering stuff on the DOM/screen. React calls these jobs side effects. Example, fetching data, console.logs, authenticating users, etc. useEffect can also force a re-render of the screen when a certain variable changes...
*/
export const TicketList = ({searchTermState}) => {
  const [tickets, setTickets] = useState([]);
  //     //we don't want to modify the array of tickets we got from the API, but still need to display a list of tickets...so need to create another state variable called filteredTickets
  const [filteredTickets, setFiltered] = useState([]);
  const [showEmergencyTickets, setShowEmergencyTickets] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const navigate = useNavigate()


  // //to display only the tickets that customers made and all tickets for employees, need to get honey_user out of local storage(it was put there in NavBar.js)
  const localHoneyUser = localStorage.getItem("honey_user");
  // //this is a string, so needs to be converted to an object using JSON.parse:
  const honeyUserObject = JSON.parse(localHoneyUser); //this will now be an object with two keys on it: id and staff
  useEffect(
    () => {
      console.log("tickets", tickets); // View the initial state of tickets
      fetch(`http://localhost:8088/serviceTickets`)
        .then((res) => res.json())
        .then((ticketsFetched) => {
          //once tickets have been fetched and converted from json to a JS array of objects, we will use this as a parameter in setTickets() to update the value of tickets
          setTickets(ticketsFetched);
        });
    },
    [] // When this array is empty, you are observing initial component state
  );
  //here we can check if the current user is an employee or a customer and modify what goes inside the state variable filteredTickets depending on whether user is customer or employee
  useEffect(
    () => {
      if (honeyUserObject.staff) {
        //if user is staff, need to see all tickets
        setFiltered(tickets);
      } else {
        //for customers, don't want to show all tickets, only the ones they made...can do this by comparing the userId in serviceTickets(i.e tickets) to the unique identifier of the logged in person in honey_user(which can be obtained from honeyUserOject above.)
        const myTickets = tickets.filter(
          (ticket) => ticket.userId === honeyUserObject.id
        );
        setFiltered(myTickets);
      }
    },
    [tickets] //this function is only run when the tickets state is changed
  );

  useEffect(() => {
    if (showEmergencyTickets) {
      const emergencyTickets = tickets.filter((ticket) => ticket.emergency === true);
      setFiltered(emergencyTickets);
    } else {
        setFiltered(tickets)
    }
  }, [showEmergencyTickets]);

//   useEffect (
//     () => {
//         const openTicketArray = tickets.filter((ticket) => {
//             return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
//         } );
//         setFiltered(openTicketArray)
     
//     }, [openOnly]
//   )

  useEffect (
    () => {
        if (openOnly) {
        const openTicketArray = tickets.filter((ticket) => {
            return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
        } );
        setFiltered(openTicketArray)
        } else {
            const myTickets = tickets.filter(
                (ticket) => ticket.userId === honeyUserObject.id
              );
              setFiltered(myTickets)
        }
    }, [openOnly]
  )

  //to observe searchTermState from TicketContainer:
  useEffect(
    () => {
        const searchedTickets = tickets.filter(ticket => {
          return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
        })//produces an array of tickets whose description matches what is typed into the input field
        setFiltered(searchedTickets)//filteredTickets is the state we are actually displaying, so it is the one we need to update with the new array searchedTickets
    }, [searchTermState]
  )
  return (
    <>
      {honeyUserObject.staff 
      ?<>
      <button onClick={() => {setShowEmergencyTickets(true); }}>Emergency Only</button> 
      <button onClick={() => {setShowEmergencyTickets(false); }}>Show All</button> 
      </>: 
      <>
      <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
      <button onClick={() => setOpenOnly(true)}>Open Tickets</button>
      <button onClick={() => setOpenOnly(false)}>All My Tickets</button>
      </>
    }   


      <h2>List of Tickets</h2>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <section className="ticket" key={ticket.id}>
              {" "}
              {/*key prop is needed whenever .map() or .filter() is used to create multiple JSX elements b/c they all ned their own unique identifier*/}
              <header>{ticket.description}</header>
              <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
            </section>
          );
        })}
      </article>
    </>
  );
};
