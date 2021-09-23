import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 33px;
  left:0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;

  div{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index:2;
    background: rgba(0,0,0,0.5);
  }
  span{
    z-index:3;
  }
`;