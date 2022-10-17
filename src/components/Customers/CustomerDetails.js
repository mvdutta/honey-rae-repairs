import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//component to capture all details of an individual employee. this component should only be displayed when the route matches employee/employeeId and this is where we will capture that employeeId, using the hook in react router DOM called useParams
export const CustomerDetails = () => {
    const {customerId} = useParams()//pulls in that object created from route parameters and then can extract any variable that you define. 
    //we want to display all the details about an employee so need a new state variable:
    const [customer, setCustomer] = useState([])

    //employeeId above is the state that we are getting from the route. Need a useEffect to observe when that state changes:
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)//getting employeeId from the route parameter
            .then(res => res.json())
            .then((data) => {//response that we get back will be an array with a simgle emplyee's details
                const singleCustomer = data[0]//only going to be one employee each time
                //state variable now needs to be updated with the value of the variable singleEmployee, which is an object
                setCustomer(singleCustomer)
            })
        },
        [customerId]
    )

    return <section className="customer customer-section">
    <header className="customer__header">{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Address: {customer.address}</div>
    <div>Phone Number: {customer.phoneNumber}</div>
    </section>
}