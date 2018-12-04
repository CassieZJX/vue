import axios from 'axios'

const instance = axios.create({
  baseURL:"https://wd2076224045uyaadr.wilddogio.com"
})

// instance.defaults.headers.common['SOMETHING'] = 'SOMETHING'

export default instance