import {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'

class HeaderBlock extends Component {

    render() {
        return (
            <header 
            className="sm:justify-between sm:flex-row flex-col flex text-2xl lg:py-8 font-bold bg-[url('../public/img/header.jpg')] bg-center bg-no-repeat bg-contain">
                <h1>
                    <Link to='/'>
                        <span className='text-red-700'>Comics</span> Marvel Shop
                    </Link>
                </h1>
                <nav>
                    <ul className='flex text-2xl font-bold space-x-4'>
                        <li>
                            <NavLink to='/' className='hover:text-red-500' >Comics Shop</NavLink>
                        </li>
                        <li>/</li>
                        <li>
                            <NavLink to='/cart' className='hover:text-red-500'>Cart</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderBlock