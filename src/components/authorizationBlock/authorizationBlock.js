import { Component} from "react";



class AuthorizationBlock extends Component {


    componentDidUpdate() {
        this.checkUser(this.props.user.email)
    }


     checkUser = (user) => {
        // if (!user){
        //     return 'write correct e-mail'
        // }
        console.log('hi');
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
           user={user}
           password={password} 
           email={email}
           onEnter={onEnter}
           checkUser={this.checkUser}
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

    const {password, email, onEnter, user} = props


    console.log(user.email);

    return(
        <div className="mt-8 max-h-[180px] ml-5 bg-red-600/75 p-5 rounded-lg">
        <form className="flex flex-col">
            <h4>Email</h4>
            <input
                // value={this.state.user.email}
                onChange={email}
                // placeholder={checkUser(user.email)}
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

