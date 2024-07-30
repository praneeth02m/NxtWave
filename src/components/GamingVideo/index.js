import {Link} from 'react-router-dom'
import {VideoItem} from '../StyleComponent'
import AppContext from '../../context/AppContext'
import './index.css'

const GamingVideo = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  return (
    <AppContext.Consumer>
      {value => {
        const {theme} = value
        const onTheme = theme === 'light'
        return (
          <VideoItem gaming onTheme={onTheme}>
            <Link to={`/videos/${id}`}>
              <img className="gaming-video-img" src={thumbnailUrl} />
              <p>
                {title} {viewCount} Watching Worldwide
              </p>
            </Link>
          </VideoItem>
        )
      }}
    </AppContext.Consumer>
  )
}

export default GamingVideo
