import React from "react";
import { Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'

export default function MyRoute({component: Component, isClosed, ...rest}) {
  const isLoggedIn = useSelector(state =>state.auth.isLoggedIn)
  if(isClosed && !isLoggedIn){ //verificar se a rota é fechada e se o user esta logado
    return (
      <Redirect
        to={{pathname:'/signin', state: {prevPath: rest.location.pathname} }}
        />
    )
  }
  return <Route {...rest} component={Component} />
}
MyRoute.defaultProps = {
  isClosed: false
}
MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]) //define que o Component vai ser um elemento ou uma função e required true
  .isRequired,
  isClosed: PropTypes.bool // informa que o isClosed é um bollean
}
