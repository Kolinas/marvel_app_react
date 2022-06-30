class MarvelQuerys {
    _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=968cc165f2be2b2088231fc0759e2132';

    _baseOffset = 300;

    getData = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllComics = async (offset = this._baseOffset ) => {
        const res = await this.getData(`${this._apiUrl}comics?orderBy=issueNumber&limit=8&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformDataComics);
    }

    rendomPrice = (max, min) => Math.floor(min+Math.random() * (max+1-min))

    _transformDataComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices.price ? `${comics.prices.price}$` : `${this.rendomPrice(1,30)}$`
        }
    }

}

export default MarvelQuerys;

