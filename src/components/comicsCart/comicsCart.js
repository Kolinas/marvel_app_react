import {Component} from "react";

class ComicsCart extends Component {
   
    sumTotalComic = (arr) => {
        if(arr.length === 0) return 
        return arr.reduce((acc, el) => acc + el.count, 0)
    }

    sumTotalPrice = (arr) => {
        if(arr.length === 0) return 
        return arr.reduce((acc, el) => acc + +el.price.slice(0,-1), 0)
    }


    createOrderCard = (arr) => {

        return arr.map(order => {

            const {id, title, price, thumbnail, count} = order
            const total = price.slice(0, -1) * count
           

            return (
                <li key={id} className='mr-6 flex flex-col items-center w-[145px]'>
                    <p className="text-center min-h-[100px]">
                        {title}
                    </p>
                    <div className="w-[80px] h-[100px]">
                        <img className="h-full" src={thumbnail} alt="" />
                    </div>
                    <p>
                        Curent price: {price}
                    </p>
                    <p>
                        Current count: {count}
                        <button onClick={() => {this.props.incCartCount(order)}}>+</button>
                        <button onClick={() => {this.props.decCartCount(order)}}>-</button>
                    </p>
                    <p className="text-red-700">
                        Total price: {total}$
                    </p>
                    <button 
                    className="bg-purple-200/50 w-[60px] rounded-[15px]"
                    onClick={() => {
                        this.props.removeCartItem(id)
                    }}>Delete</button>
                </li>
            )
        })
    }

    render() {

        const totalComics = this.sumTotalComic(this.props.orders)
        const totalPrice = this.sumTotalPrice(this.props.orders)
        const orderCard = this.createOrderCard(this.props.orders)

        return (
            <div>
                <ul className="flex flex-wrap">
                    {orderCard}
                </ul>
                <div className="mt-6 text-center text-2xl">
                    You have <span className="text-red-700">{totalComics ? totalComics : 0}</span> Comics in cart
                </div>
                <div className="mt-6 text-center text-2xl">
                Total price <span className="text-red-700">{totalPrice ? totalPrice : 0}</span>
                </div>
            </div>
        )
    }
}

export default ComicsCart;

