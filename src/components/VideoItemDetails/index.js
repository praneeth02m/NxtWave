import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import SideNavigation from '../SideNavigation'
import {
  PageContainer,
  HeaderDiv,
  SideAndContentDiv,
  ContentContainer,
  ProfileImg,
  VideoPageBtn,
} from '../StyleComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoData: {},
  }

  componentDidMount() {
    this.getVideo()
  }

  onSuccess = data => {
    const videoData = {
      id: data.id,
      title: data.title,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      channel: data.channel,
      viewCount: data.view_count,
      publishedAt: formatDistanceToNow(new Date(data.published_at), {
        addSuffix: true,
      }).split(' ')[1],
      description: data.description,
      isSaved: false,
      isLiked: false,
    }
    this.setState({videoData, apiStatus: apiStatusConstants.success})
  }

  getVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.video_details)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  toggleLike = () => {
    this.setState(prevState => {
      const {videoData} = prevState // Destructuring here
      const isLiked = videoData.isLiked === 'liked' ? false : 'liked'
      return {
        videoData: {
          ...videoData,
          isLiked,
        },
      }
    })
  }

  toggleDislike = () => {
    this.setState(prevState => {
      const {videoData} = prevState // Destructuring here
      const isLiked = videoData.isLiked === 'disliked' ? false : 'disliked'
      return {
        videoData: {
          ...videoData,
          isLiked,
        },
      }
    })
  }

  toggleSave = (getSaved, saveVideoList) => {
    this.setState(
      prevState => {
        const {videoData} = prevState
        const isSaved = !videoData.isSaved
        return {
          videoData: {
            ...videoData,
            isSaved,
          },
        }
      },
      () => {
        const {videoData} = this.state
        getSaved(videoData)
      },
    )
  }

  render() {
    const {videoData} = this.state
    const {
      id,
      videoUrl,
      title,
      viewCount,
      publishedAt,
      channel = {},
      description,
    } = videoData
    const {
      name,
      profile_image_url: profileImageUrl,
      subscriber_count: subscriberCount,
    } = channel
    const likeTheme = videoData.isLiked === 'liked'
    const dislikeTheme = videoData.isLiked === 'disliked'
    return (
      <AppContext.Consumer>
        {value => {
          const {theme, getSaved, saveVideoList} = value
          const onTheme = theme === 'light'
          const isSaved = saveVideoList.some(each => each.id === videoData.id)
          return (
            <PageContainer onTheme={onTheme}>
              <HeaderDiv>
                <Header />
              </HeaderDiv>
              <SideAndContentDiv>
                <SideNavigation />
                <ContentContainer
                  style={{padding: '20px 20px'}}
                  data-testid="videoItemDetails"
                >
                  <ReactPlayer url={videoUrl} width="99%" />
                  <p>{title}</p>
                  <div className="videoplayer-options">
                    <p>
                      {viewCount} views . {publishedAt} years ago
                    </p>
                    <div className="sss">
                      <VideoPageBtn
                        btnTheme={likeTheme}
                        onClick={this.toggleLike}
                      >
                        <AiOutlineLike className="videopageOpt-icon" />
                        Like
                      </VideoPageBtn>
                      <VideoPageBtn
                        btnTheme={dislikeTheme}
                        onClick={this.toggleDislike}
                      >
                        <AiOutlineDislike className="videopageOpt-icon" />
                        Dislike
                      </VideoPageBtn>
                      <VideoPageBtn
                        btnTheme={isSaved}
                        onClick={() => this.toggleSave(getSaved, saveVideoList)}
                      >
                        <MdPlaylistAdd className="videopageOpt-icon" />
                        {isSaved ? 'Saved' : 'Save'}
                      </VideoPageBtn>
                    </div>
                  </div>
                  <hr />
                  <div className="profile-description">
                    <ProfileImg src={profileImageUrl} />
                    <div style={{padding: '0px'}}>
                      <p style={{padding: '0px'}}>{name}</p>
                      <p style={{padding: '0px', color: '#616e7c'}}>
                        {subscriberCount} subscribers
                      </p>
                      <p style={{padding: '0px'}}>{description}</p>
                    </div>
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

export default VideoItemDetails
