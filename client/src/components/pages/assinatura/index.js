import axios from "axios";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as style from './styled'

export default function Assinatura(){
  const state = useSelector(state=>state.auth)
  console.log(state)
  return (
    <style.Container>
      <h4>Assinatura</h4>
    </style.Container>
  )
}
