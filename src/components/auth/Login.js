import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState("hpassfield7@netvibes.com")//initial state of email is this email address
    const navigate = useNavigate()//another hook that allows us to navigate to any link that's defined in React router
//this function gets invoked when sign in button is clicked
    const handleLogin = (e) => {
        e.preventDefault()//prevents default behavior of browser, which is to refresh the page. Without this, user can't log in

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("honey_user", JSON.stringify({//local storage is temporary storage that is always accessible to the browser. Data stored here is always in json format so needs to be stringified
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Honey Rae Repairs</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}//onChange is called whenever any change happemns in the input(typing, deleting, pasting, etc)
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus /> {/* When the user types the first letter into the email input, onChange is triggered and what the user has typed(the value), is put into setEmail, which stores it in the state variable email(above). Then, immediately, the value property of the email input is set equal to the state variable email. The result of doing this is that the state variable email is always up to date with what the user is typing.*/}
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

