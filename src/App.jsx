import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { Template } from './components/MainComponents'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'

import './App.css'

import Route from './Routes'

const App = () => {
    return (
        <BrowserRouter>
            <Template>
                <Header />
                <Route />
                <Footer />
            </Template>
        </BrowserRouter>
    )
}

export default App
