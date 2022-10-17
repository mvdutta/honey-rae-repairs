import { Link } from "react-router-dom"
//component that is a child of parent EmployeeList that renders individual details
//export const Employee = ({employeeObject})
export const Employee = ({id, fullName, email}) => {//there are three peices of information needed here from parent EmployeeList: id, fullName, and email
    //const id = employeeObject.id
    return <section className="employee">
    <div>
        <Link to={`/employees/${id}`}>Name: {fullName}</Link>
    </div>
    <div>Email: {email}</div>
</section>
}

