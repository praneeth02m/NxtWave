import styled from 'styled-components'

export const LoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-shadow: 0px 0px 10px #bfbfbf;
  width: 330px;
  font-family: 'Roboto';
`

export const Logo = styled.img`
  width: 125px;
  margin-bottom: 20px;
`

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 2;
  margin-top: 20px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
`

export const Input = styled.input`
  height: 25px;
  padding: 14px 16px;
  outline: none;
  border: 1px solid #e2e8f0;
  border-radius: 3px;
  color: #64748b;
`

export const CheckboxDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`

export const CheckLabel = styled.label`
  color: #424242;
  font-size: 12px;
  font-weight: 500;
`
export const LoginBtn = styled.button`
  width: 100%;
  margin-top: 20px;
  background-color: #3b82f6;
  color: #ffffff;
  padding-top: 7px;
  padding-bottom: 7px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 0px;
`
export const Error = styled.p`
  color: #ff0b37; 
  font-size: 12px;
  align-self: flex-start;
  margin: 1px;
  font-family: 'Roboto;
`
