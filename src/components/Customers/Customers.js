import { Link } from "react-router-dom"
//component that is a child of parent CustomerList that renders individual details
export const Customers = ({customerObject}) => {//there are four peices of information needed here from parent CustomerList: id, fullName, address, phoneNumber
    const id = customerObject.id
    const name = customerObject.user.fullName
    const address = customerObject.address
    const phone = customerObject.phoneNumber
    return <section className="customer">
    <div>
        <Link to={`/customers/${id}`}>Name: {name}</Link>
    </div>
    <div>Address: {address}</div>
    <div>Phone Number: {phone}</div>
</section>
}