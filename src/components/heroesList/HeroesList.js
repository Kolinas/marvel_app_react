import {Component} from 'react'
import MarvelQuerys from '../../querys/MarvelQuerys'


class HeroesList extends Component {

    state = {
        comicsList: [],
    }

    marvel = new MarvelQuerys()

    componentDidMount() {
        this.marvel.getAllComics()
        .then(this.comicsLoad)
    }

    comicsLoad = (comicsList) => {
        this.setState({
            comicsList 
        })
    }

    createComicsCard (arr) {
        return arr.map(comics => {
            return (
                <li key={comics.id} className='mb-8'>
                <p className='text-sm font-bold text-red-600 my-4 max-w-[210px] min-h-[60px] text-center'>{comics.title}</p>
                <div className='w-[210px] h-[300px]'>
                <img className='w-[100%] h-[100%]' src={comics.thumbnail} alt="" />
                </div>
                <div className='flex justify-between items-baseline'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'>Buy</button>
                <p>{comics.price}</p>
                </div>
            </li> 
            )
        })
    }

    render() {
                
        const {comicsList} = this.state
        const comicsCard = this.createComicsCard(comicsList)

        return(
            <div className='w-[75%] mt-5'>
                <ul className='flex justify-between flex-wrap'>
                    {comicsCard}
                </ul>
            </div>
        )
    }
}

export default HeroesList