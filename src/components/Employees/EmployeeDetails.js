import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//component to capture all details of an individual employee. this component should only be displayed when the route matches employee/employeeId and this is where we will capture that employeeId, using the hook in react router DOM called useParams
export const EmployeeDetails = () => {
    const {employeeId} = useParams()//pulls in that object created from route parameters and then can extract any variable that you define. 
    //we want to display all the details about an employee so need a new state variable:
    const [employee, setEmployee] = useState([])

    //employeeId above is the state that we are getting from the route. Need a useEffect to observe when that state changes:
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)//getting employeeId from the route parameter
            .then(res => res.json())
            .then((data) => {//response that we get back will be an array with a simgle emplyee's details
                const singleEmployee = data[0]//only going to be one employee each time
                //state variable now needs to be updated with the value of the variable singleEmployee, which is an object
                setEmployee(singleEmployee)
            })
        },
        [employeeId]
    )


//now can build JSX with the data we collected above:
//the ? on fullName, email and employeeTickets below is the optional chaining operator used because fullName and email are properties of properties, wheras specialty and rate are direct properties of employee. It means, only keep going down this path if the properties exist.

    return <section className="employee employee-section">
    <header className="employee__header">{employee?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: ${employee.rate}</div>
    <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} ticket/s</footer>
    </section>
}