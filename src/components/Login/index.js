import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import {
  LoginDiv,
  Form,
  Logo,
  Label,
  InputDiv,
  Input,
  CheckLabel,
  CheckboxDiv,
  LoginBtn,
  Error,
} from './LoginStyles'

class Login extends Component {
  state = {
    username: '',
    password: '',
    checkBox: false,
    isError: false,
    errorMsg: '',
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getCheck = event => {
    this.setState({checkBox: event.target.checked})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  loginFun = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, checkBox, errorMsg, isError} = this.state
    return (
      <LoginDiv>
        <Form onSubmit={this.loginFun}>
          <Logo src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
          <InputDiv>
            <Label htmlFor="username">USERNAME</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.getUsername}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              type={checkBox ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.getPassword}
            />
          </InputDiv>
          <CheckboxDiv>
            <input
              type="checkbox"
              htmlFor="checkbox"
              checked={checkBox}
              onChange={this.getCheck}
            />
            <CheckLabel id="checkbox">Show Password</CheckLabel>
          </CheckboxDiv>
          <LoginBtn type="submit">Login</LoginBtn>
          {isError && <Error>*{errorMsg}</Error>}
        </Form>
      </LoginDiv>
    )
  }
}

export default Login
