import {Component} from 'react'
import {IoLogoGameControllerB} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import SideNavigation from '../SideNavigation'
import GamingVideo from '../GamingVideo'
import {
  PageContainer,
  HeaderDiv,
  SideAndContentDiv,
  MenuTitleContainer,
  MenuTitleIconDiv,
  ContentContainer,
} from '../StyleComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamingVideos: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  onSuccess = data => {
    const updateData = data.map(each => ({
      id: each.id,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    this.setState({
      apiStatus: apiStatusConstants.success,
      gamingVideos: updateData,
    })
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.videos)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOnSuccess = () => {
    const {gamingVideos} = this.state
    return (
      <ul className="gaming-video-list">
        {gamingVideos.map(each => (
          <GamingVideo key={each.id} videoDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getRetry = () => {
    this.getTrendingVideos()
  }

  renderFailureView = onTheme => {
    const failureImg = onTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <div>
        <img src={failureImg} />
        <h1>Opps! Something Went Wrong</h1>
        <p>We are having some trouble to complete your request.</p>
        <p>Please Try again.</p>
        <button onClick={this.getRetry}>Retry</button>
      </div>
    )
  }

  renderGaming = onTheme => {
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
    return (
      <AppContext.Consumer>
        {value => {
          const {theme} = value
          const onTheme = theme === 'light'
          return (
            <PageContainer onTheme={onTheme}>
              <HeaderDiv>
                <Header />
              </HeaderDiv>
              <SideAndContentDiv>
                <SideNavigation />
                <ContentContainer data-testid="gaming">
                  <MenuTitleContainer onTheme={onTheme}>
                    <MenuTitleIconDiv onTheme={onTheme}>
                      <IoLogoGameControllerB
                        style={{width: '100%', height: '30px', color: 'red'}}
                      />
                    </MenuTitleIconDiv>
                    <h1>Gaming</h1>
                  </MenuTitleContainer>
                  {this.renderGaming(onTheme)}
                </ContentContainer>
              </SideAndContentDiv>
            </PageContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Gaming
