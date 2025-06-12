exports.handler = async function (e) {

    const API_KEY = process.env.OMDB_API_KEY;
    const movieTitle = e.queryStringParameters.title;
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieTitle)}`);
    const data = await response.json();

    return {
        statusCode: response.status,
        body: JSON.stringify(data)
    };
};