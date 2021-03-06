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
            offset: 8,
            prevPage: false,
        }
    }

    marvel = new MarvelQuerys()

    componentDidMount() {
        this.onRequest(this.state.offset)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.offset !== prevState.offset) {
            this.onRequest(this.state.offset)
        }
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

    nextLoad = () => {
        this.setState(({offset}) => ({
            offset: offset + 8,
            prevPage: false
        }))
    }

    prevLoaded = () => {
        if (this.state.offset <= 8){
         this.setState(({prevPage}) => ({
                prevPage: !prevPage,
            }))
        }

         this.setState(({offset}) => ({
            offset: offset - 8
        }))
    }

    comicsLoad = (newComicsList) => {
        const imgStatus = newComicsList.map(comics => ({...comics, status: true}))
        this.setState(({offset}) => ({ 
            comicsList : [...imgStatus],
            loading: false,
            newComicsLoading: false,
            offset: offset
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

            const setImg = (
            <>
            <img className='w-[100%] h-[100%]' src={thumbnail} alt="" />
            <button 
            onClick={changeState}
            className='absolute bottom-[1px] right-[1px] border-dotted border-4 border-blue-400 bg-purple-300'>
                Show More</button>
            </>
            )
            
            const desc = (
                <>
            <button 
            onClick={changeState}
            className='absolute bottom-[1px] right-[1px] border-solid border-2 border-blue-400 bg-red-400 rounded-xl'>
                Return</button>
                <p>{`${description.slice(0,300)}......`}</p>
                </>
            )

            return (
                <li key={id} className='mb-8 hover:translate-y-[-5px] hover:shadow duration-300'>
                <p className='text-sm font-bold text-red-600 my-4 max-w-[210px] min-h-[60px] text-center'>{title}</p>
                <div
                className='w-[210px] h-[300px] relative'>
                {status ? setImg : desc}
                </div>
                <div className='flex justify-between items-baseline'>
                <button 
                onClick={() =>this.props.addToCart({id, title, price, thumbnail})} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'>Buy</button>
                <p>{price}</p>
                </div>
            </li> 
            )
        })
    }

    render() {
                
        const {comicsList, loading, newComicsLoading, offset, prevPage} = this.state
        const comicsCard = this.createComicsCard(comicsList)

        return(
            <div className='w-[75%] mt-5'>
                <ul className='flex justify-between flex-wrap'>
                    {loading ? <Loader/> : comicsCard}
                </ul>
                <div className='flex justify-between'>
                    <button 
                    onClick={() => this.prevLoaded(offset)}
                    disabled={newComicsLoading || prevPage}
                    className='bg-red-700 w-[100px] rounded-[15px] text-white disabled:opacity-75 hover:scale-125 hover:text-blue-400'
                    >Prev</button>
                    <button 
                    onClick={() => this.nextLoad()}
                    disabled={newComicsLoading}
                    className='bg-red-700 w-[100px] rounded-[15px] text-white disabled:opacity-75 hover:scale-125 hover:text-blue-400'
                    >Next</button>
                </div>
            </div>
        )
    }
}

export default HeroesList