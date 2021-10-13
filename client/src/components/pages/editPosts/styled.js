import styled from "styled-components";

export const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 30px;
  overflow-x: hidden;
  background-color: #f7f7f7;
  height: 100vh;
`
export const ConfigPostContainer = styled.div`
  padding: 5px;
  text-align: center;
  object-position: center;
  vertical-align: middle;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100vw;
  .configOptions{
    min-width: 80px;
  }
  i{
    color: black !important;
    font-size: 36px;
  }
  span{
    font-size: 12px;
  }

  hr{
    border: 0;
    border-top: 1px solid #ececec;
    /* color: gray; */
  }
`
export const PaymentContainer = styled.div`
  position: absolute;
  height: calc(100vh - 93px);
  width: 100vw;
  margin: auto;
  top: 25px;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 550px;
  background-color: white;
  text-align: center;
  padding: 10px;
  overflow: hidden;
  z-index: 1;
  .qrImageCont{
    padding: 10px;
    border: 2px solid #32bcad;
    border-radius: 10px;
  }
  .servicoInfor{
    display: flex;
    justify-content: space-between;
    h6{
      color: gray;
    }
  }
  .valor{
    color: #32bcad !important;
    font-weight: bold;
  }
  .servicoDesc{
    font-weight: bold;
  }
  .close{
    font-size: 20px;
    font-weight: bold;
    color: red;
    right: 10px;
    top: 0;
    position: absolute;
  }
`
export const QrContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-top: 20px;
`
export const BackDrop = styled.div`
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: black;
    opacity: 0.5;
    overflow: hidden;
`

export const QrCode = styled.img`
  width: 200px;
  height: 200px;
`