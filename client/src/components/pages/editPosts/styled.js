import styled from "styled-components";

export const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 30px;
  overflow-x: hidden;
  background-color: #f7f7f7;
  min-height: 100vh;
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