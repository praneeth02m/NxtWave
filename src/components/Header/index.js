import {Component} from 'react'
import {FaMoon} from 'react-icons/fa'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {IoMenu} from 'react-icons/io5'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {IoLogoGameControllerB} from 'react-icons/io'
import {CgPlayListAdd} from 'react-icons/cg'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {
  Button,
  PopupDiv,
  NavOption,
  IconContainer,
  NavList,
  NavItem,
} from '../StyleComponent'
import 'reactjs-popup/dist/index.css'
import AppContext from '../../context/AppContext'
import './index.css'

const navOptionsList = [
  {
    id: 1,
    text: 'Home',
    icon: <AiFillHome />,
    path: '/',
  },
  {
    id: 2,
    text: 'Trending',
    icon: <HiFire />,
    path: '/trending',
  },
  {
    id: 3,
    text: 'Gaming',
    icon: <IoLogoGameControllerB />,
    path: '/gaming',
  },
  {
    id: 4,
    text: 'Saved videos',
    icon: <CgPlayListAdd />,
    path: '/saved-videos',
  },
]

class Header extends Component {
  state = {
    currentPath: '/',
  }

  componentDidMount() {
    const {
      location: {pathname},
    } = this.props
    this.setState({currentPath: pathname})
  }

  componentDidUpdate(prevProps) {
    const {
      location: {pathname},
    } = this.props
    if (pathname !== prevProps.location.pathname) {
      this.setState({currentPath: pathname})
    }
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {currentPath} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {theme, changeTheme} = value
          const isLightMode = theme === 'light'
          const onTheme = theme === 'dark'
          const logo = isLightMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          const backgroundColor = isLightMode ? 'light-mode' : 'dark-mode'
          return (
            <div className={`header-container ${backgroundColor}`}>
              <div className="header-content">
                <Link to="/">
                  <img className="logo-style" src={logo} alt="website logo" />
                </Link>
                <div className="header-options">
                  <button
                    type="button"
                    className="theme-btn"
                    data-testid="theme"
                    onClick={changeTheme}
                    aria-label={
                      isLightMode
                        ? 'Switch to dark mode'
                        : 'Switch to light mode'
                    }
                  >
                    {isLightMode ? (
                      <FaMoon className="theme-light" />
                    ) : (
                      <FiSun className="theme-dark" />
                    )}
                  </button>
                  <img
                    className="profile-style"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />

                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className={`menu-small ${onTheme && 'change-color'}`}
                        aria-label="Open menu"
                      >
                        <IoMenu style={{height: '100%', width: '100%'}} />
                      </button>
                    }
                    className="popup-content"
                    contentStyle={{background: isLightMode ? '#fff' : '#333'}}
                  >
                    {close => (
                      <div className="menu-div">
                        <NavList>
                          {navOptionsList.map(each => {
                            const {id, path, icon, text} = each
                            const isSelected = currentPath === path
                            return (
                              <Link key={id} to={path} className="link-style">
                                <NavItem
                                  onTheme={onTheme}
                                  isSelected={isSelected}
                                >
                                  <IconContainer isSelected={isSelected}>
                                    {icon}
                                  </IconContainer>
                                  <NavOption whiteText={onTheme}>
                                    {text}
                                  </NavOption>
                                </NavItem>
                              </Link>
                            )
                          })}
                        </NavList>
                      </div>
                    )}
                  </Popup>

                  <Popup
                    modal
                    trigger={
                      <div>
                        <Button className="logout-btn" modeStyle={isLightMode}>
                          Logout
                        </Button>
                        <button
                          type="button"
                          className={`small-logout ${
                            onTheme && 'change-color'
                          }`}
                          aria-label="Logout"
                        >
                          <FiLogOut style={{height: '100%', width: '100%'}} />
                        </button>
                      </div>
                    }
                    className="popup-content"
                    contentStyle={{background: isLightMode ? '#fff' : '#333'}}
                  >
                    {close => (
                      <PopupDiv>
                        <p style={{color: isLightMode ? '#000' : '#fff'}}>
                          Are you sure, you want to logout?
                        </p>
                        <div className="cancel-logout">
                          <Button
                            modeStyle={isLightMode}
                            cancel
                            onClick={() => close()}
                          >
                            Cancel
                          </Button>
                          <Button confirm onClick={this.onLogout}>
                            Confirm
                          </Button>
                        </div>
                      </PopupDiv>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default withRouter(Header)
