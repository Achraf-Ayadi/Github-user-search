import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0()
  const isLogin = user && isAuthenticated

  return (
    <Route
      {...rest}
      render={() => {
        return isLogin ? children : <Redirect to='/login'></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
