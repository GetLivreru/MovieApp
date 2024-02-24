const axios = require('axios');
const NEWSAPI_KEY = "714b33fc8b2a4e5e872b460be22d6e6c";

async function getNewsByCity() {
    let response, responseData = null;

    try {
        response = await axios.get(`https://newsapi.org/v2/everything?q=aircraft&apiKey=${NEWSAPI_KEY}&pageSize=10&page=1`);
        responseData = response?.data?.articles;
    } catch {
        return null;
    }

    let answer = [];

    responseData.forEach(article => {
        answer.push({
            "source": article.source.name,
            "title": article.title,
            "description": article.description,
            "url": article.url,
            "image": article.urlToImage,
            "published_at": new Date(article.publishedAt).toLocaleString('en-GB', { 
                hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric', hour12: false
            })
        });
    });

    return answer;
}
async function getActors() {
    try {
        // Запрос к TMDB API для получения списка рандомных актеров
        const response = await axios.get('https://api.themoviedb.org/3/person/popular', {
            params: {
                api_key: 'ff90285baa8888e9e1f26f80679d4de9',
                language: 'en-US',
                page: 1
            }
        });

        const actors = response.data.results.slice(0, 6).map(actor => ({
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : null
        }));

        return actors;
    } catch (error) {
        console.error('Error fetching actors:', error);
        return null;
    }
}

module.exports = {
    getNewsByCity,
    getActors // Добавляем экспорт функции getActors
};