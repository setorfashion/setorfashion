import React, { useEffect, useState } from "react";
import history from "../../../services/history";
import { useDispatch } from "react-redux";
import { ContentItens, Container, CloseMenuContainer, CloseButton } from './styled'
import * as actions from '../../../store/module/auth/actions'

export default function ConfigMenu() {
  const dispatch = useDispatch()
  function sair() {
    dispatch(actions.logout())
  }
  function redirect(to) {
    history.push(to)
    dispatch(actions.menu(false))
  }
  return (
    <Container>
      <ContentItens onClick={() => redirect('/configstore')}>
        <span>Configurar Loja</span>
      </ContentItens>
      <ContentItens onClick={() => redirect('/token')}>
        <span> Acesso Instagram</span>
      </ContentItens>
      <ContentItens onClick={() => redirect('/')}>
        <span>Relatório Pagamentos</span>
      </ContentItens>
      <ContentItens onClick={() => redirect('/assinatura')}>
        <span>Assinatura</span>
      </ContentItens>
      <ContentItens onClick={() => sair()}>
        <span>Sair</span>
      </ContentItens>
      <CloseMenuContainer>
        <CloseButton onClick={() => dispatch(actions.menu(false))}>
          <i className="material-icons">close</i>
        </CloseButton>
      </CloseMenuContainer>
    </Container>
  )
}