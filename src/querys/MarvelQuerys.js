class MarvelQuerys {
    _apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=968cc165f2be2b2088231fc0759e2132';

    getData = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllHeroes = async () => {
        const res = await this.getData(`${this._apiUrl}characters?limit=8&offset=310&${this._apiKey}`);
        return res.data.results.map(item => item.thumbnail.path)
    }

    getHeroe = (id) => {
        return this.getData(`${this._apiUrl}characters/${id}?${this._apiKey}`);
    }

    // transformData = (hero) => {
    //     return hero.thumbnail.path
    // }
}

export default MarvelQuerys;