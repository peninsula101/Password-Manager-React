import './index.css'

const starImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, showPassword} = props
  const {id, websiteName, userName, password, initialColor} = passwordDetails

  const initial = websiteName[0].toUpperCase()

  const onClickDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className={initialColor}>
        <p className="initial">{initial}</p>
      </div>
      <div className="password-details">
        <p className="name">{websiteName}</p>
        <p className="name">{userName}</p>
        {showPassword ? (
          <p className="name">{password}</p>
        ) : (
          <img src={starImg} className="star-img" alt="star" />
        )}
      </div>
      <div className="btn-container">
        <button type="button" className="delete-btn" onClick={onClickDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
