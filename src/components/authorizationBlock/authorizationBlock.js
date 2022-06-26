import { Component } from "react";

class AuthorizationBlock extends Component {
    render() {
        return(
            <div className="mt-8 max-h-[180px] ml-5 bg-red-600/75 p-5 rounded-lg">
                <form className="flex flex-col">
                    <h4>Email</h4>
                    <input className="rounded-3xl" type="text"/>
                    <h4>Password</h4>
                    <input className="rounded-3xl" type="text"/>
                    <button className="px-1 py-1 bg-white mt-4 rounded-3xl">Log In</button>
                </form>
            </div>
        )
    }
}

export default AuthorizationBlock