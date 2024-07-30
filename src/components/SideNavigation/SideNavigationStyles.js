import styled from 'styled-components'

export const NavOption = styled.p`
  margin-left: 10px;
  color: ${props => (props.whiteText ? '#ffffff' : '#000000')};
`

export const IconContainer = styled.div`
  width: 35px;
  height: 20px;
  & > * {
    width: 100%;
    height: 100%;
  }
  color: ${props => props.isSelected && 'red'};
`
const getBackgroundColor = props => {
  if (props.onTheme) {
    return props.isSelected ? '#424242' : 'initial'
  }
  return props.isSelected ? '#f1f1f1' : 'initial'
}

export const NavItem = styled.li`
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0px 10px;
  color: #555a60;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 500;
  background-color: ${props => getBackgroundColor(props)};
`
export const NavList = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  padding-top: 15px;
  margin: 0px;
`
export const SideNav = styled.div`
  background-color: ${props => props.darkMode && '#313131'};
  display: none;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 60px;
  height: 100%;
  width: 230px;
  position: fixed;
  @media (min-width: 576px) {
    display: flex;
  }
`
export const ContactUsIcon = styled.img`
  width: 32px;
  margin-right: 10px;
`
