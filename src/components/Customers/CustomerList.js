import { useEffect, useState } from "react"
import { Customers } from "./Customers"
import "./Customer.css"

//function to set initial state, and in initial state useEffect, will fetch all of the customers from the API, pull them in, 
export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
        },[]
    )

    return <>
      <h2 className="customerHeader">Current Customers</h2>
    <article className="customers">
        
        {
            customers.map(customer => <Customers key={`customer--${customer.id}`} customerObject = {customer}
             />)
        }       
    </article>
    </>
}
