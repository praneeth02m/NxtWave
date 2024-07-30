import AppContext from '../../context/AppContext'
import Header from '../Header'
import SideNavigation from '../SideNavigation'

import {PageContainer, HeaderDiv, SideAndContentDiv} from '../StyleComponent'
import './index.css'

const NotFound = () => (
  <AppContext.Consumer>
    {value => {
      const {theme} = value
      const onTheme = theme === 'light'
      const notFoundImg = onTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <PageContainer onTheme={onTheme}>
          <HeaderDiv>
            <Header />
          </HeaderDiv>
          <SideAndContentDiv>
            <SideNavigation />
            <div className="not-found-container">
              <div className="not-found">
                <img
                  src={notFoundImg}
                  alt="not-found"
                  className="not-found-img"
                />
                <h1 style={{margin: '0px'}}>Page Not Found</h1>
                <p>We are sorry, the page you requested could not be found.</p>
              </div>
            </div>
          </SideAndContentDiv>
        </PageContainer>
      )
    }}
  </AppContext.Consumer>
)

export default NotFound
