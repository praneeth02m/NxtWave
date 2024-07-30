import React from 'react'

const AppContext = React.createContext({
  theme: 'light',
  optionSelected: '',
  isBannerVisible: true,
  saveVideoList: [],
  toggleSave: () => {},
  handleBannerClose: () => {},
  changeTheme: () => {},
})

export default AppContext
