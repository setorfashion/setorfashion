import styled from "styled-components";

export const CardContainer = styled.div`
  z-index:0;
  position:unset;
  max-width: 614px;
  margin: 20px auto;

`
export const CardImage = styled.div`
    text-align: center;
    height: 100%;
    object-fit: fill;
`
export const Image = styled.img`
    width: 100%;
      margin: 3px 0px 0px 0px;
      object-fit: cover;
      background-color: black;
      display: unset;
      position: unset;
      z-index: 1;
`
export const CardDescribeContent = styled.div`
  padding: 15px;
  border-radius: 0 0 2px 2px;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: black !important;
  a{
    font-weight: bold;
    color: black !important;
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