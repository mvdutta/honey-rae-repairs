import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, setProfile] = useState({
        address: "",
        phone: "",
        userId: 0
    })
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

    const localHoneyUser = localStorage.getItem("honey_user");
    // //this is a string, so needs to be converted to an object using JSON.parse:
    const honeyUserObject = JSON.parse(localHoneyUser); //this will now be an object with two keys on it: id and staff


    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then(res => res.json())
        .then((data) => {
            const customerObject = data[0]
            setProfile(customerObject)
        })
    }, [])


    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

          return fetch(`http://localhost:8088/customers/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
            .then(res => res.json()) 
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
            }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Customer Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                    onChange={
                        (evt) => {
                            const copy = {...profile}
                            copy.address = evt.target.value
                            setProfile(copy)
                        }
                    }
                
                    />
                        
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = (evt.target.value)
                                setProfile(copy)
                            }
                        }
                        />
                       
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}