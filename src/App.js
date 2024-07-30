import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import AppContext from './context/AppContext'

class App extends Component {
  state = {
    theme: 'light',
    optionSelected: 1,
    isBannerVisible: true,
    saveVideoList: [],
  }

  handleBannerClose = () => {
    this.setState({isBannerVisible: false})
  }

  changeTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }))
  }

  getSaved = data => {
    this.setState(prevState => {
      const isVideoSaved = prevState.saveVideoList.some(
        video => video.id === data.id,
      )
      if (isVideoSaved) {
        return {
          saveVideoList: prevState.saveVideoList.filter(
            video => video.id !== data.id,
          ),
        }
      }
      return {
        saveVideoList: [...prevState.saveVideoList, data],
      }
    })
  }

  render() {
    const {theme, optionSelected, isBannerVisible, saveVideoList} = this.state
    return (
      <AppContext.Provider
        value={{
          theme,
          optionSelected,
          isBannerVisible,
          saveVideoList,
          getSaved: this.getSaved,
          handleBannerClose: this.handleBannerClose,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
