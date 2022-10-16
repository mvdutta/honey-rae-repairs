import { useEffect, useState } from "react"
import "./Employees.css"

//function to set initial state, and in initial state useEffect, will fetch all of the employees from the API, pull them in, and in the JSX, will render (display) the name and email address of employees
export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users?isStaff=true`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },[]
    )
//will display all employees
    return <>
      <h2 className="employeeHeader">Current Employees</h2>
    <article className="employees">
        
        {
            employees.map(employee => {
                return <section className="employee" key={`employee--${employee.id}`}>
                    <div>Name: {employee.fullName}</div>
                    <div>Email: {employee.email}</div>
                </section>
            })
        }       
    </article>
    </>
}