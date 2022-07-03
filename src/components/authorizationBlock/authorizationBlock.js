import { Component } from "react";



class AuthorizationBlock extends Component {


    checkMail = (e) => {
        // e.preventDefault()
        // const isEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(e.target.value);
        // console.log(isEmail, e.target.value)
        // return isEmail ? hi : by; 

    }


    render() {

        const {password, email, onEnter, user, isLoged, onLogOut} = this.props

        console.log(this.props.user);

        return(
            <>
            {
            isLoged 
            ?
            <ViewUser 
            email={user.email}
            onLogOut={onLogOut}
            />
            :
           <NoLoginUser 
           password={password} 
           email={email}
           onEnter={onEnter}
           />
           }
            </>
        )
    }
}

const ViewUser = (props) => {

    const {onLogOut} = props

    return (
        <div className="mt-8 max-h-[180px] ml-5 bg-red-600/75 p-5 rounded-lg w-[220px] flex flex-col justify-between items-center">
          <h4 className="text-green-300 text-xl">User: {props.email}</h4> 
          <button 
          onClick={onLogOut}
          className="border-2 border-solid border-black rounded-3xl px-3 py-1">Log Out</button>
         </div>
    )
}

const NoLoginUser = (props) => {

    const {password, email, onEnter} = props

    return(
        <div className="mt-8 max-h-[180px] ml-5 bg-red-600/75 p-5 rounded-lg">
        <form className="flex flex-col">
            <h4>Email</h4>
            <input
                // value={this.state.user.email}
                onChange={email}
                className="rounded-3xl" type="text" />
            <h4>Password</h4>
            <input
                // value={this.state.user.password}
                onChange={password}
                className="rounded-3xl" type="password" />
            <button
                onClick={onEnter}
                className="px-1 py-1 bg-white mt-4 rounded-3xl"
            >Log In</button>
        </form>
    </div>
    )
}

export default AuthorizationBlock

