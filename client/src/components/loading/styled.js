import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  overflow-y: hidden;

  div{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index:20;
    background: rgba(0,0,0,0.8);
    overflow-y: hidden;
  }
  span{
    z-index:23;
  }
`;