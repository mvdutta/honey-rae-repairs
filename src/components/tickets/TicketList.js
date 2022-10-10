import { useEffect, useState } from "react"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
/*useState is used to register a certain variable with React so it keep track of it and change the DOM when changes are made to the variable via the setter function. To register the variable tickets, with an initial value of [], we do the following: call useState with the initial value (the empty array). Then useState will give us an array with 2 things in it: the first is our variable tickets, and the second is a setter function for our variable which allows us to make any changes to the variable. Both of these are obtained by using array destructuring. The above code is equivalent to the following: 
const variableAndSetter = useState([])
const tickets = variableAndSetter[0]
const setTickets = variableAndSetter[1]...these 3 lines are condensed to one line in the line of code above
*/

/*
useEffect() is a function that takes in 2 parameters. The first is a function and the second is an array called the dependency array .If the array is left empty, the function (the first parameter) will be run only when the component loads. If any state variables are put inside the array(like tickes above), then the component will be re-rendered whenever any of these variables change. 

useEffect()can be used to do jobs that are not related to rendering stuff on the DOM/screen. React calls these jobs side effects. Example, fetching data, console.logs, authenticating users, etc. useEffect can also force a re-render of the screen when a certain variable changes...
*/
    useEffect(
        () => {
            console.log("tickets", tickets) // View the initial state of tickets
            fetch(`http://localhost:8088/serviceTickets`)
            .then(res => res.json())
            .then((ticketsFetched) => {//once tickets have been fetched and converted from json to a JS array of objects, we will use this as a parameter in setTickets() to update the value of tickets
              setTickets(ticketsFetched)
            });
        
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <h2>List of Tickets</h2>
}

