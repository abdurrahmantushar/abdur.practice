import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

import { Store } from './app.store/reduxstore.jsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(

<Provider store={Store}>
    <QueryClientProvider client={queryClient}> 
        <App />
    </QueryClientProvider>
</Provider>
)
