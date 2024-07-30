import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {VideoItem, ProfileImg} from '../StyleComponent'
import AppContext from '../../context/AppContext'
import './index.css'

const HomeVideos = ({videoDetails}) => {
  const {
    channel,
    publishedAt,
    id,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  const {name, profile_image_url: profileImageUrl} = channel
  const publishedDate = new Date(publishedAt)
  const timeAgo = formatDistanceToNow(publishedDate, {addSuffix: true})
  const getYear = timeAgo.split(' ')[1]
  return (
    <AppContext.Consumer>
      {value => {
        const {theme} = value
        const onTheme = theme === 'light'
        return (
          <VideoItem onTheme={onTheme}>
            <Link to={`/videos/${id}`}>
              <img
                className="thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="profile-and-title">
                <ProfileImg src={profileImageUrl} alt="channel logo" />
                <div>
                  <p>{title}</p>
                  <p className="videos-para">{name}</p>
                  <p className="videos-para">
                    {viewCount} views . {getYear} years ago
                  </p>
                </div>
              </div>
            </Link>
          </VideoItem>
        )
      }}
    </AppContext.Consumer>
  )
}

export default HomeVideos
