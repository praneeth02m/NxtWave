import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {IoLogoGameControllerB} from 'react-icons/io'
import {CgPlayListAdd} from 'react-icons/cg'
import AppContext from '../../context/AppContext'
import {
  NavOption,
  IconContainer,
  NavList,
  NavItem,
  ContactUsIcon,
  SideNav,
} from './SideNavigationStyles'
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

class SideNavigation extends Component {
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

  render() {
    const {theme, changeOption} = this.context
    const {currentPath} = this.state
    const onTheme = theme === 'dark'

    return (
      <SideNav darkMode={onTheme}>
        <NavList>
          {navOptionsList.map(each => {
            const {id, path, icon, text} = each
            const isSelected = currentPath === path

            return (
              <Link key={id} to={path} className="link-style">
                <NavItem onTheme={onTheme} isSelected={isSelected}>
                  <IconContainer isSelected={isSelected}>{icon}</IconContainer>
                  <NavOption whiteText={onTheme}>{text}</NavOption>
                </NavItem>
              </Link>
            )
          })}
        </NavList>
        <div className="contact-div">
          <NavOption whiteText={onTheme}>Contact us</NavOption>
          <div>
            <ContactUsIcon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <ContactUsIcon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <ContactUsIcon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </div>
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </SideNav>
    )
  }
}

SideNavigation.contextType = AppContext

export default withRouter(SideNavigation)
