const { default: axios } = require("axios")

const getall = async (url) => {
    const response = await axios.get(`https://localhost:5000/api/${url}`)
    return response.data
}

export {getall}