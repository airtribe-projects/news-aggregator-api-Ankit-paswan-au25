const axios = require('axios');

//Read all Prefrences
const getAllPrefrences = async (req, res, next) => {
    try {

        //const freshNews = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=63835a01936144ba818c675cb03a3a79')
        res.status(200).send({
            status: "Success",
            totalNews: freshNews.data.totalResults,
            news: { ...freshNews.data.articles }
        })

    } catch (error) {

        return next({ msg: error.msg, status: 500 })
    }
}


//Everything Prefrences
const everythingAsPrefrences = async (req, res, next) => {
    try {
        const requestedNews = {
            q: req.body.q,
            sources: req.body.sources,
            domains: req.body.domains,
            from: req.body.from,
            to: req.body.to,
            language: req.body.language,
            sortBy: req.body.sortBy,
            page: Number(req.body.page)
        }
        let mainUrl = 'https://newsapi.org/v2/everything?'
        const authInUrl = '&apiKey=63835a01936144ba818c675cb03a3a79'

        let flexiUrl = ""
        if (requestedNews.q) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `q=${requestedNews.q}`
            } else {
                mainUrl = mainUrl + `&q=${requestedNews.q}`
            }
        }
        if (requestedNews.sources) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.sources}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.sources}`
            }

        }
        if (requestedNews.domains) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.domains}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.domains}`
            }

        }
        if (requestedNews.from) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.from}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.from}`
            }

        }
        if (requestedNews.to) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.to}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.to}`
            }

        }
        if (requestedNews.language) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.language}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.language}`
            }

        }
        if (requestedNews.sortBy) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.sortBy}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.sortBy}`
            }

        }
        if (requestedNews.page) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `${requestedNews.page}`
            } else {
                mainUrl = mainUrl + `&${requestedNews.page}`
            }

        }


        let finalUrl = mainUrl + flexiUrl + authInUrl //



        const news = await axios.get(finalUrl)

        if (news.data.articles.length <= 0) {
            return next({ msg: "no news found with this combinations please change it.", status: 404 })
        }

        res.status(200).send(news.data)


    } catch (error) {

        return next({ msg: error.msg, status: 500 })
    }
}

//topheadlines prefrences
const topHeadlinesAsPrefrences = async (req, res, next) => {
    try {

        const requestedNews = {
            country: req.body.country,
            category: req.body.category,
            sources: req.body.sources,
            q: req.body.q,
            language: req.body.language,
            pageSize: req.body.pageSize,
            page: req.body.page
        }
        let mainUrl = 'https://newsapi.org/v2/top-headlines?'
        let authInUrl = '&apiKey=63835a01936144ba818c675cb03a3a79'

        //const t1 = mainUrl.endsWith('?')
        if (requestedNews.country) {
            mainUrl = mainUrl + `country=${requestedNews.country}`
        }
        if (requestedNews.category) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `category=${requestedNews.category}`
            }
            else {
                mainUrl = mainUrl + `&category=${requestedNews.category}`
            }

        }
        if (requestedNews.sources) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `sources=${requestedNews.sources}`
            }
            else {
                mainUrl = mainUrl + `&sources=${requestedNews.sources}`
            }
        }
        if (requestedNews.q) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `q=${requestedNews.q}`
            }
            else {
                mainUrl = mainUrl + `&q=${requestedNews.q}`
            }
        }
        if (requestedNews.language) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `language=${requestedNews.language}`
            }
            else {
                mainUrl = mainUrl + `&language=${requestedNews.language}`
            }
        }
        if (requestedNews.pageSize) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `pageSize=${requestedNews.pageSize}`
            }
            else {
                mainUrl = mainUrl + `&pageSize=${requestedNews.pageSize}`
            }
        }
        if (requestedNews.page) {
            if (mainUrl.endsWith('?')) {
                mainUrl = mainUrl + `page=${requestedNews.page}`
            }
            else {
                mainUrl = mainUrl + `&page=${requestedNews.page}`
            }
        }


        const finalUrl = mainUrl + authInUrl
        const news = await axios.get(finalUrl)

        if (news.data.articles.length <= 0) {
            return next({ msg: "no news found with this combinations please change it.", status: 404 })
        }
        res.status(200).send(news.data)
    } catch (error) {

        return next({ msg: error.msg, status: 500 })
    }
}

//source prefrences
const SourceAsPrefrences = async (req, res, next) => {
    try {
        const sourceNews = {
            category: req.body.category,
            language: req.body.language,
            country: req.body.country
        }
        let mainurl = 'https://newsapi.org/v2/top-headlines/sources?'
        const authInUrl = '&apiKey=63835a01936144ba818c675cb03a3a79'
        if (sourceNews.category) {
            if (mainurl.endsWith('?')) {
                mainurl = mainurl + `category=${sourceNews.category}`
            } else {
                mainurl = mainurl + `&category=${sourceNews.category}`
            }
        }
        if (sourceNews.language) {
            if (mainurl.endsWith) {
                mainurl = mainurl + `language=${sourceNews.language}`
            } else {
                mainurl = mainurl + `&language=${sourceNews.language}`
            }
        }
        if (sourceNews.country) {
            if (mainurl.endsWith('?')) {
                mainurl = mainurl + `country=${sourceNews.country}`
            } else {
                mainurl = mainurl + `&country=${sourceNews.country}`
            }
        }

        const finalurl = mainurl + authInUrl

        const news = await axios.get(finalurl)

        if (news.data.sources.length <= 0) {
            return next({ msg: 'no source news found ', status: 404 })
        }

        res.status(200).send(news.data)
    } catch (error) {

        return next({ msg: error.message, status: 500 })
    }
}

module.exports = {
    getAllPrefrences,
    everythingAsPrefrences,
    topHeadlinesAsPrefrences,
    SourceAsPrefrences
}