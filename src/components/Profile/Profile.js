import { CustomerForm } from "./CustomerForm";
import { EmployeeForm } from "./EmployeeForm";


export const Profile = () => {
    const localHoneyUser = localStorage.getItem("honey_user");
    // //this is a string, so needs to be converted to an object using JSON.parse:
    const honeyUserObject = JSON.parse(localHoneyUser); //this will now be an object with two keys on it: id and staff
    if (honeyUserObject.staff) {
       return <EmployeeForm/>
    } else {
        return <CustomerForm/>
    }

}