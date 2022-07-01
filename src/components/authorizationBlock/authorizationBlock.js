import { Component } from "react";

class AuthorizationBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    checkMail = (e) => {
        const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(e.target.value);
        console.log(isEmail, e.target.value)
        // return isEmail ? hi : by; 
    }



    render() {
        return(
            <div className="mt-8 max-h-[180px] ml-5 bg-red-600/75 p-5 rounded-lg">
                <form className="flex flex-col">
                    <h4>Email</h4>
                    <input onChange={this.checkMail}
                    className="rounded-3xl" type="text"/>
                    <h4>Password</h4>
                    <input 
                    className="rounded-3xl" type="text"/>
                    <button 
                    onClick={(e) => {
                        e.preventDefault()
                        console.log('hi');
                    }}
                    className="px-1 py-1 bg-white mt-4 rounded-3xl"
                    >Log In</button>
                </form>
            </div>
        )
    }
}

export default AuthorizationBlock