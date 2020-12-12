import React from 'react'
import { useHistory } from 'react-router-dom'

const About = () => {
    const history = useHistory()

    return (
        <button onClick={() => history.push('/')} type="button">
            Voltar
        </button>
    )
}

export default About
