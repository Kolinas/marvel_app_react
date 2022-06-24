import {Component} from 'react'
import abyss from '../heroesList/abyss.jpg'

import MarvelQuerys from '../../querys/MarvelQuerys'

const marvel = new MarvelQuerys()

// marvel.getAllHeroes().then(data => console.log(data))

class HeroesList extends Component {

    state = {
        img: [],
        loading: true
    }

    marvel = new MarvelQuerys()

    componentDidMount() {
        this.marvel.getAllHeroes()
        .then(this.imageLoad)
    }

    imageLoad = (img) => {
        this.setState({
            img, 
            loading: false
        })
    }

    createHeroCard (arr) {
        return arr.map(img => {
            return (
                <li className='my-10 w-[200px] h-[200px]'>
                <img className='object-cover w-full h-full' src={`${img}.jpg`} alt="" />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'>Buy</button>
            </li> 
            )
        })
    }

    render() {
                
        const {img} = this.state
        const heroImg = this.createHeroCard(img)
        console.log(img);

        return(
            <div className='w-[70%]'>
                <ul className='flex justify-between flex-wrap'>
                    {heroImg}
                </ul>
            </div>
        )
    }
}

export default HeroesList