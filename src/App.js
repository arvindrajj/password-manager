import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    webList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isVisible: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  listenUsername = event => {
    this.setState({username: event.target.value})
  }

  listenPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const className = colorList[Math.floor(Math.random() * 5)]
    const newList = {
      id: v4(),
      website,
      username,
      password,
      className,
    }
    if (website === '' || username === '' || password === '') {
      // eslint-disable-next-line no-alert
      alert('ValidInput')
    } else {
      this.setState(prevState => ({
        webList: [...prevState.webList, newList],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeleteWeb = id => {
    const {webList} = this.state
    const newList = webList.filter(each => each.id !== id)
    this.setState({webList: newList})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  isPasswordShow = event => {
    if (event.target.checked) {
      this.setState({isVisible: true})
    } else {
      this.setState({isVisible: false})
    }
  }

  render() {
    const {website, username, password, webList, searchInput} = this.state
    const {isVisible} = this.state
    const filteredWebList = webList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sub-div1-image2"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-image"
                alt="website"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>

            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-image"
                alt="username"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.listenUsername}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-image"
                alt="password"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{filteredWebList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.isPasswordShow}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {filteredWebList.length === 0 && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {filteredWebList.length > 0 && (
            <ul className="result-container">
              {filteredWebList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.className}`}>
                    {eachValue.website[0].toUpperCase()}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.website}</p>
                    <p className="website">{eachValue.username}</p>
                    {!isVisible && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isVisible && (
                      <p className="website">{eachValue.password}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    testid="delete"
                    onClick={() => this.onDeleteWeb(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
