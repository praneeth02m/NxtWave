import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosClose} from 'react-icons/io'
import {IoSearchOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import SideNavigation from '../SideNavigation'
import HomeVideos from '../HomeVideos'
import {
  Button,
  PageContainer,
  HeaderDiv,
  SideAndContentDiv,
  SearchDiv,
  SearchBar,
  SearchBtn,
  ContentContainer,
} from '../StyleComponent'
import BannerContainer from './style'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {search: '', videosData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.gethomeVideos()
  }

  onSuccess = data => {
    const updateData = data.map(each => ({
      channel: each.channel,
      id: each.id,
      publishedAt: each.published_at,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      videosData: updateData,
    })
  }

  gethomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {search} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.videos)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  inputSearch = event => {
    this.setState({search: event.target.value})
  }

  getSearch = () => {
    this.gethomeVideos()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = onTheme => {
    const failureImg = onTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <div>
        <img src={failureImg} />
        <h1>Oops! Something Went Wrong</h1>
        <p>We are having some trouble to complete your request.</p>
        <p>Please Try again.</p>
        <button type="button" onClick={this.getRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderOnSuccess = () => {
    const {videosData} = this.state
    if (videosData.length < 1) {
      return (
        <div className="no-video-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="no-video"
          />
          <h1 style={{margin: '0px', fontSize: '20px'}}>
            No Search results found
          </h1>
          <p>Try different key words or remove search filter</p>
        </div>
      )
    }
    return (
      <ul className="videos-list">
        {videosData.map(each => (
          <HomeVideos key={each.id} videoDetails={each} />
        ))}
      </ul>
    )
  }

  renderHome = onTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView(onTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {theme, isBannerVisible, handleBannerClose} = value
          const onTheme = theme === 'light'
          return (
            <PageContainer onTheme={onTheme}>
              <HeaderDiv>
                <Header />
              </HeaderDiv>
              <SideAndContentDiv>
                <SideNavigation />
                <ContentContainer data-testid="home">
                  {isBannerVisible && (
                    <BannerContainer data-testid="banner">
                      <div className="vv">
                        <img
                          className="logo-banner"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <button
                          data-testid="close"
                          className="banner-close"
                          type="button"
                          aria-label="banner close"
                          onClick={handleBannerClose}
                        >
                          <IoIosClose
                            style={{
                              height: '20px',
                              width: '20px',
                            }}
                          />
                        </button>
                      </div>
                      <p className="banner-info">
                        Buy Nxt Watch Premium prepaid plans with <br /> UPI
                      </p>
                      <Button getitnow>GET IT NOW</Button>
                    </BannerContainer>
                  )}
                  <div className="home-content">
                    <SearchDiv onTheme={onTheme}>
                      <SearchBar
                        value={search}
                        onTheme={onTheme}
                        type="search"
                        placeholder="Search"
                        onChange={this.inputSearch}
                      />
                      <SearchBtn
                        data-testid="searchButton"
                        type="button"
                        onClick={this.getSearch}
                        onTheme={onTheme}
                      >
                        <IoSearchOutline style={{width: '13px'}} />
                      </SearchBtn>
                    </SearchDiv>
                    {this.renderHome(onTheme)}
                  </div>
                </ContentContainer>
              </SideAndContentDiv>
            </PageContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home
