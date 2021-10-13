import styled from "styled-components";

export const Container = styled.div`
  /* padding-top: 65px; */
  padding-bottom: 30px;
  width: 100%;
  overflow-x: hidden;
  background-color: #f7f7f7;
  height: 100vh;
  overflow: hidden !important;
  margin-top: -15px;
  z-index: 0;
`
export const CloseMenuContainer = styled.div`
  position: fixed;
  bottom: 65px;
  width: 100%;
  max-width: 550px;
  min-height: 65px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  display: flex;
`
export const CloseButton = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: gray;
  justify-content: center;
  align-items: center;
  display: flex;
`
export const ContentItens = styled.div`
  width: 100%;
  max-width: 550px;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #ececec;
  min-height: 55px;
  align-items: center;
  display:flex;
  font-size: 18px;
  span{
    color:black !important;
  }
  i{
    color:white !important;
    font-size: 24px !important;
    margin-right: 15px;
    float: left;
  }
`