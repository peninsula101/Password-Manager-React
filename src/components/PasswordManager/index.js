import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const bgColors = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    websiteName: '',
    userName: '',
    password: '',
    searchInput: '',
    showPassword: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password, showPassword} = this.state
    const initialColor = `initial-container ${
      bgColors[Math.ceil(Math.random() * bgColors.length - 1)]
    }`

    const newPassword = {
      id: v4(),
      websiteName,
      userName,
      password,
      initialColor,
      showPassword,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  renderEmptyPasswordsPage = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-passwords-img"
        alt="no passwords"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  onDeletePassword = id => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(each => each.id !== id),
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeStatus = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {
      websiteName,
      userName,
      password,
      passwordList,
      searchInput,
      showPassword,
    } = this.state

    const filteredPasswordsList = passwordList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="add-password-container-with-logo">
          <div className="sm-password-manager-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="sm-password-manager-img"
            />
          </div>
          <div className="add-new-password-container">
            <form className="form" onSubmit={this.onAddNewPassword}>
              <h1 className="form-head">Add New Password</h1>
              <div className="logo-input-container">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="form-logo"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={websiteName}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="logo-input-container">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="form-logo"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={userName}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="logo-input-container">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="form-logo"
                    alt="username"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <div className="lg-password-manager-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="lg-password-manager-img"
            />
          </div>
        </div>
        <div className="show-password-container">
          <div className="password-count-search-container">
            <div className="passwords-head-count-container">
              <p className="passwords-head">Your passwords</p>
              <div className="count-container">
                <p className="password-list-count">
                  {filteredPasswordsList.length}
                </p>
              </div>
            </div>
            <div className="search-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="checkbox-container">
            <div className="show-passwords-container">
              <input
                type="checkbox"
                className="checkbox"
                id="showPasswords"
                onChange={this.onChangeStatus}
              />
              <label htmlFor="showPasswords" className="label">
                Show Passwords
              </label>
            </div>
          </div>
          <div className="added-passwords-list-container">
            {filteredPasswordsList.length === 0 ? (
              this.renderEmptyPasswordsPage()
            ) : (
              <ul className="passwords-list">
                {filteredPasswordsList.map(each => (
                  <PasswordItem
                    key={each.id}
                    passwordDetails={each}
                    deletePassword={this.onDeletePassword}
                    showPassword={showPassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
