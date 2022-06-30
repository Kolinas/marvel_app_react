import { Component} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderBlock from "../headerBlock/headerBlock";
import HeroesList from "../heroesList/HeroesList";
import AuthorizationBlock from "../authorizationBlock/authorizationBlock"
import ComicsCart from '../comicsCart/comicsCart'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: []
    }
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
  }

  incCartCount = (comics) => {
    this.setState(({orderList}) => {
      const newOrderList = orderList.map(item => item.id === comics.id ? {...item, count: item.count+1} : item )
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
      return {
        orderList: newOrderList
      }
  })
  }

  removeCartItem = (id) => {
    this.setState(({orderList}) => {
      const newCartList = orderList.filter(comics => comics.id !== id)
      return {
        orderList: newCartList
      }
    })
  }


  render () { 
 
  return (
    <BrowserRouter>
    <div className="mx-auto my-0 w-[1200px] py-12">
      <HeaderBlock/>
      <main className="flex">
      <Routes>
          <Route path='/' element={
          <>
          <HeroesList 
          addToCart={this.addToCart}/>
          <AuthorizationBlock/>
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
