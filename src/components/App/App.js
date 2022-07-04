import { Component, createRef} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderBlock from "../headerBlock/headerBlock";
import HeroesList from "../heroesList/HeroesList";
import AuthorizationBlock from "../authorizationBlock/authorizationBlock"
import ComicsCart from '../comicsCart/comicsCart'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: [],
      user: {
        email: '',
        password: ''
      },
      isLoged: false
    }
    this.myRef = createRef()
  }

  componentDidMount() {
    this.checkLocalStorage()
  }

  checkLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('orderList'))
    if (items) {
      return this.setState({
        orderList: items
      })
    }
  }

  changeLocalStorage = (item, value) => {
    return localStorage.setItem(item, JSON.stringify(value))
  }

  takeEmail = (e) => {
    const isEmail = /(.+)@(.+){2,}\.(.+){2,}/i.test(e.target.value);
      if (isEmail) {
        this.setState(({ user }) => ({
          user: {
            email: e.target.value,
            password: user.password
          }
        }))
      }
  }

  takePasword = (e) => {
    this.setState(({ user }) => ({
      user: {
        email: user.email,
        password: e.target.value,
      }
    }))
  }

  onEnter = (e) => {
    e.preventDefault();
        if(this.state.user.email){
        return this.setState(({ userEnter }) => ({
            userEnter: !userEnter
          }))
        }

        return this.state.user.email
  }

  onLogOut = () => {
    this.setState(({ userEnter }) => ({
      userEnter: !userEnter,
      user: {
        email: '',
        password: ''
      },
    }))
  }

  addToCart = (order) => {
    const checkSameComics = this.state.orderList.find(comics => comics.id === order.id)
    let orderList = []

    checkSameComics 
    ?
    orderList = this.state.orderList.map(item => item.id===order.id ? {...order, count: item.count+1} : item)
    :
    orderList = [...this.state.orderList, {...order, count: 1}]
    
    this.setState({orderList})
    this.changeLocalStorage('orderList', orderList)
  }

  incCartCount = (comics) => {
    this.setState(({orderList}) => {
      const newOrderList = orderList.map(item => item.id === comics.id ? {...item, count: item.count+1} : item )
      this.changeLocalStorage('orderList', newOrderList)
      return {
        orderList: newOrderList
      }
  })
  }

  decCartCount = (comics) => {
      this.setState(({orderList}) => {
        let newOrderList = orderList.map(item => item.id === comics.id ? {...item, count: item.count-1} : item )
        if (comics.count <=1) {
          newOrderList = orderList.map(item => item.id === comics.id ? {...item, count: 1} : item )
        }
        this.changeLocalStorage('orderList', newOrderList)
      return {
        orderList: newOrderList
      }
   })
  }

  removeCartItem = (id) => {
    this.setState(({orderList}) => {
      const newCartList = orderList.filter(comics => comics.id !== id)
      this.changeLocalStorage('orderList', newCartList)
      return {
        orderList: newCartList
      }
    })
  }


  render () { 
 
  return (
    <BrowserRouter>
    <div className="mx-auto my-0 w-[1200px] py-12 container">
      <HeaderBlock/>
      <main className="flex">
      <Routes>
          <Route path='/' element={
          <>
          <HeroesList 
          addToCart={this.addToCart}/>
          <AuthorizationBlock
            password={this.takePasword}
            email={this.takeEmail}
            onEnter={this.onEnter}
            onLogOut={this.onLogOut}
            user ={this.state.user}
            isLoged={this.state.userEnter}
          />
          </>
          }
          />    
          <Route path='/cart' 
          element={<ComicsCart 
            orders={this.state.orderList} 
            incCartCount={this.incCartCount}
            decCartCount={this.decCartCount}
            removeCartItem={this.removeCartItem}
          />}/>
      </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;
