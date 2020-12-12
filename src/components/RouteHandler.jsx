import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogged } from '../helpers/AuthHandler'

const RouteHandler = ({ children, ...rest }) => {
    const logged = isLogged()
    const authorized = !(rest.private && !logged)

    return (
        <Route
            {...rest}
            render={() => (authorized ? children : <Redirect to="signin" />)}
        />
    )
}

export default RouteHandler
