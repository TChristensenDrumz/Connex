import axios from 'axios'

export const socketIO = async () => {
    return await axios.get("/test")
}