import styled from "styled-components";

export const CardContainer = styled.div`
  z-index:0;
  position:unset;
  max-width: 614px;
  margin: 20px auto;
  box-shadow: 0 1px 0 0 rgba(0,0,0,.2) !important;

`
export const CardImage = styled.div`
    text-align: center;
    height: 100%;
    object-fit: fill;
    margin-bottom: -5px;
`
export const Image = styled.img`
      width: 100%;
      object-fit: contain;
      /* background-color: #ececec; */
      background-color: black;
      display: unset;
      position: unset;
      z-index: 1;
`
export const CardDescribeContent = styled.div`
  padding: 15px;
  border-radius: 0 0 2px 2px;
  background-color: white;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: black !important;
  a{
    font-weight: bold;
    color: black !important;
  }
  .prefix{
    color: #cecece !important;
  }
  .sendPosition{
    float: right;
    margin-top: -15px;
  }
  i{
    color: black;
  }
`

export const CardHeader = styled.div`
  height: 60px;
  padding: 16px;
  font-size: 14px;
  a{
    font-weight: bold;
    color: black !important;
  }
`

export const ImageCircle = styled.div`
    align-items: center;
    width: 42px;
    height: 42px;
    overflow: hidden;
    border-radius: 50%;
    border: 3px solid transparent;
    float: left;
    margin-top: -5px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    z-index: 2;
`

export const ImageByCicle = styled.img`
  width: 33px;
  height: 33px;
  border-radius: 50%;
`

export const HeaderDescription = styled.div`
  margin-top: -5px;
  display: inline-block;
`
export const HeaderLocalInformation = styled.div`
  margin-top: -5px;
  right: 0;
  float: right;
  padding-left: 15px;
  span{
    font-weight: bold;
  }
`