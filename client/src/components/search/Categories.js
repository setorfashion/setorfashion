import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize'
import { getAutoCompleteStuff, getAutoCompleteStores } from '../scripts/autocomplete'
import { MainSearch } from './Main'
import { useDispatch, useSelector } from 'react-redux'
import * as actionsStuffs from '../../store/module/searchStuffs/actions'

export default function Categories(){
  const dispatch = useDispatch()
  const state = useSelector(state=>state.search)

  return (
    <>
    Categoriesa
    </>
  )

}