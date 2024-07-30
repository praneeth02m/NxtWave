import {HiFire} from 'react-icons/hi'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import SideNavigation from '../SideNavigation'
import TrendingVideo from '../TrendingVideo'
import {
  PageContainer,
  HeaderDiv,
  SideAndContentDiv,
  MenuTitleContainer,
  MenuTitleIconDiv,
  ContentContainer,
} from '../StyleComponent'

import './index.css'

const renderVideos = (saveVideoList, onTheme) => (
  <>
    <MenuTitleContainer onTheme={onTheme}>
      <MenuTitleIconDiv onTheme={onTheme}>
        <HiFire style={{width: '100%', height: '30px', color: 'red'}} />
      </MenuTitleIconDiv>
      <h1>Saved Videos</h1>
    </MenuTitleContainer>
    <ul className="trendvideos-container">
      {saveVideoList.map(each => (
        <TrendingVideo key={each.id} videoDetails={each} />
      ))}
    </ul>
  </>
)

const renderNoVideos = () => (
  <div className="no-saved-container">
    <img
      className="no-saved-img"
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
      alt="no saved videos"
    />
    <h1 style={{margin: '0px', fontSize: '20px'}}>No saved videos found</h1>
    <p>You can save your videos while watching them</p>
  </div>
)

const SavedVideos = () => (
  <AppContext.Consumer>
    {value => {
      const {theme, saveVideoList} = value
      const onTheme = theme === 'light'
      const renderSavedVideos =
        saveVideoList.length > 0
          ? renderVideos(saveVideoList, onTheme)
          : renderNoVideos()
      return (
        <PageContainer onTheme={onTheme}>
          <HeaderDiv>
            <Header />
          </HeaderDiv>
          <SideAndContentDiv>
            <SideNavigation />
            <ContentContainer data-testid="savedVideos">
              {renderSavedVideos}
            </ContentContainer>
          </SideAndContentDiv>
        </PageContainer>
      )
    }}
  </AppContext.Consumer>
)

export default SavedVideos
