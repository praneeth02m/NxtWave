import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingVideos: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  onSuccess = data => {
    console.log(data)
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
      trendingVideos: updateData,
    })
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
    const {trendingVideos} = this.state
    return (
      <ul className="trendvideos-container">
        {trendingVideos.map(each => (
          <TrendingVideo key={each.id} videoDetails={each} />
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

  renderTrending = onTheme => {
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
                <ContentContainer data-testid="trending">
                  <MenuTitleContainer onTheme={onTheme}>
                    <MenuTitleIconDiv onTheme={onTheme}>
                      <HiFire
                        style={{width: '100%', height: '30px', color: 'red'}}
                      />
                    </MenuTitleIconDiv>
                    <h1>Trending</h1>
                  </MenuTitleContainer>
                  {this.renderTrending(onTheme)}
                </ContentContainer>
              </SideAndContentDiv>
            </PageContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Trending
