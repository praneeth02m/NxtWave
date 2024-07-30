import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {VideoItem, ProfileImg} from '../StyleComponent'
import AppContext from '../../context/AppContext'
import './index.css'

const TrendingVideo = ({videoDetails}) => {
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
          <VideoItem trending onTheme={onTheme}>
            <Link to={`/videos/${id}`}>
              <img
                className="thumbnail-trend"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="trend-profile-description">
                <ProfileImg
                  className="trend-small"
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p>{title}</p>
                  <p>{name}</p>
                  <p>
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

export default TrendingVideo
