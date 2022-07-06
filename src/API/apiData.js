
import axios from 'axios'

export const getapiData = async () => {
    const res = await axios.get("http://localhost:3000/last")
    console.log("Si me ejecute")
    console.log(res.data[0].sensores.length)
}


