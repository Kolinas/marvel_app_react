import {Component} from 'react'

class HeaderBlock extends Component {

    render() {
        return (
            <header className="flex justify-between text-2xl py-8 font-bold bg-[url('../public/img/header.jpg')] bg-center bg-no-repeat bg-contain">
                <h1>
                    <a href='#/'>
                        <span className='text-red-700'>Comics</span> Marvel Shop
                    </a>
                </h1>
                <nav>
                    <ul className='flex text-2xl font-bold space-x-4'>
                        <li>
                            <a className='hover:text-red-500' href="#/">Character Information</a>
                        </li>
                        <li>/</li>
                        <li>
                        <a className='hover:text-red-500' href="#/">Cabinet</a>
                        </li>

                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderBlock