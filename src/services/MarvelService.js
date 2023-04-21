import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, processState, setProcessState} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = process.env.REACT_APP_API_KEY;
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const getCharByName = async (name = 'Thor') => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: !char.description ? "Unfortunately there is no description for this character" : char.description.slice(0, 210),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.splice(0, 10)
        }
    }

    const _transformComics = comic => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
			pageCount: comic.pageCount ? `${comic.pageCount} p.` : "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : "not available",
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        }

    }

    return {clearError,
            processState,
            setProcessState,
            getAllCharacters,
            getCharacter,
            getCharByName,
            getAllComics,
            getComic};
}

export default useMarvelService;