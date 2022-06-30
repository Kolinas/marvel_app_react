import {Component} from 'react'
import Loader from '../loader/Loader';
import MarvelQuerys from '../../querys/MarvelQuerys'


class HeroesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comicsList: [],
            loading: true,
            newComicsLoading: false,
        }
    }

    marvel = new MarvelQuerys()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.comicsLoading()
        this.marvel.getAllComics(offset)
            .then(this.comicsLoad)
    }

    comicsLoading = () => {
        this.setState({
            newComicsLoading: true
        })
    }

    comicsLoad = (newComicsList) => {
        const imgStatus = newComicsList.map(comics => ({...comics, status: true}))
        this.setState(({comicsList}) => ({ 
            comicsList : [...comicsList, ...imgStatus],
            loading: false,
            newComicsLoading: false,
        }))
    }



    createComicsCard = (arr) => {
        return arr.map(comics => {
            const {id, title, price, thumbnail, description, status} = comics
        
            const changeState = () => {
                this.setState(({comicsList}) => {
                    const showDesc = comicsList.map(comics => comics.id === id ? {...comics, status: !comics.status} : comics) 
                   return {
                    comicsList : showDesc
                   }
                })
            }

            const setImg = <img className='w-[100%] h-[100%]' src={thumbnail} alt="" />
            const desc = <p>{`${description.slice(0,300)}......`}</p>

            return (
                <li key={id} className='mb-8'>
                <p className='text-sm font-bold text-red-600 my-4 max-w-[210px] min-h-[60px] text-center'>{title}</p>
                <div onClick={()=> {
                    changeState()
                }}
                className='w-[210px] h-[300px]'>
                {status ? setImg : desc}
                </div>
                <div className='flex justify-between items-baseline'>
                <button onClick={() =>this.props.addToCart({id, title, price, thumbnail})} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'>Buy</button>
                <p>{price}</p>
                </div>
            </li> 
            )
        })
    }

    render() {
        console.log(this.state.comicsList);
                
        const {comicsList, loading} = this.state
        const comicsCard = this.createComicsCard(comicsList)

        return(
            <div className='w-[75%] mt-5'>
                <ul className='flex justify-between flex-wrap'>
                    {loading ? <Loader/> : comicsCard}
                </ul>
                <div className='flex justify-between'>
                    <button className=''>Prev</button>
                    <button className=''>Next</button>
                </div>
            </div>
        )
    }
}

export default HeroesList