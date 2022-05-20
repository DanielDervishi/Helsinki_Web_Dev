import ReactDOM from 'react-dom/client'
import App from './App'

import axios from 'axios'

axios.get('/api/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes} />
  )
})