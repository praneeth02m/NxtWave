import styled, {css} from 'styled-components'

export const Button = styled.button`
  border: 1px solid ${props => (props.modeStyle ? '#3b82f6' : '#ffffff')};
  font-family: 'Roboto';
  font-size: 13px;
  padding: 5px 15px;
  color: ${props => (props.modeStyle ? '#3b82f6' : '#ffffff')};
  background-color: transparent;
  cursor: pointer;

  ${props =>
    props.confirm &&
    css`
      color: #ffffff;
      background-color: #3b82f6;
      border: 1px solid #3b82f6;
    `}

  ${props =>
    props.cancel &&
    css`
      color: #64748b;
      border: 1px solid #64748b;
    `}

  ${props =>
    props.getitnow &&
    css`
      color: #000000;
      background-color: transparent;
      border: 1px solid #000000;
      font-weight: 500;
    `}
`

export const PopupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div.cancel-logout {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
`

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.onTheme ? '#f9f9f9' : '#181818')};
  color: ${props => (props.onTheme ? '#000' : '#fff')};
`

export const HeaderDiv = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
`

export const SideAndContentDiv = styled.div`
  display: flex;
  height: 100%;
  margin-top: 60px;
`

export const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.onTheme ? '#fff' : 'transparent')};
  width: 100%;
  border: 1px solid #909090;
  height: 30px;

  @media (min-width: 576px) {
    width: 40%;
  }
`

export const SearchBar = styled.input`
  width: 85%;
  height: 95%;
  outline: none;
  border: none;
  margin-right: 1px;
  padding-left: 10px;
  background-color: ${props => (props.onTheme ? '#fff' : 'transparent')};
`

export const SearchBtn = styled.button`
  border-left: 1px solid #909090;
  border-right: none;
  border-top: none;
  border-bottom: none;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  color: #909090;
  background-color: ${props => (props.onTheme ? '#f1f1f1' : '#313131')};
`

export const VideoItem = styled.li`
  width: 100%;
  margin-right: 0px;
  margin-bottom: 30px;
  background-color: ${props => (props.onTheme ? '#f9f9f9' : '#181818')};

  div {
    p {
      color: ${props => (props.onTheme ? '#000' : '#fff')};
      margin: 0px;
      line-height: 1.5;
    }
    .videos-para {
      color: #616e7c;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (min-width: 576px) {
    width: 30%;
    margin-right: 15px;
  }

  ${props =>
    props.trending &&
    css`
      display: flex;
      margin-bottom: 50px;

      a {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      @media (min-width: 576px) {
        width: 100%;

        a {
          display: flex;
          flex-direction: row;
        }
      }
    `}

  ${props =>
    props.gaming &&
    css`
      width: 40%;
      height: 310px;
      margin-right: 0px;
      margin-bottom: 20px;

      p {
        color: ${nestedProps => (nestedProps.onTheme ? '#000' : '#fff')};
        padding: 0px;
        margin: 0px;
        font-size: 13px;
        line-height: 1.5;
      }

      @media (min-width: 576px) {
        width: 30%;
      }
    `}
`
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-top: 10px;
`

export const VideoItemPage = styled.div`
  margin-left: 230px;
  width: 100%;
  padding: 20px 20px;
`

export const VideoPageBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  padding: 0px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  color: ${props => (props.btnTheme ? '#2563eb' : '#64748b')};
`

export const NotFoundImg = styled.img.attrs(props => ({
  src: props.onTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png',
}))``

export const MenuTitleContainer = styled.div`
  background-color: ${props => (props.onTheme ? '#f6f3f3' : '#242020')};
  display: flex;
  align-items: center;
  padding: 10px 50px;
`

export const MenuTitleIconDiv = styled.div`
  background-color: ${props => (props.onTheme ? '#fff' : '#000')};
  width: 50px;
  height: 50px;
  border-radius: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

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

const getBackgroundColor = ({onTheme, isSelected}) => {
  if (onTheme) {
    return isSelected ? '#424242' : 'initial'
  }
  return isSelected ? '#f1f1f1' : 'initial'
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

export const ContentContainer = styled.div`
  width: 100%;

  @media (min-width: 576px) {
    margin-left: 230px;
  }
`
