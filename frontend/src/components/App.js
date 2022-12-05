import React from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import DeleteConfirmPopup from "./DeleteConfirmPopup.js";
import Login from "./Login.js";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [isRegistrationSuccessful, setRegistrationSuccessful] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [profileEmail, setProfileEmail] = React.useState('')

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((res) => res.filter((c) => card._id !== c._id))
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards().then((res) => setCards(res)).catch((err) => console.log(err))
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo().then((res) => {
        setCurrentUser(res)
      }).catch((err) => console.log(err))
    }
  }, [loggedIn])

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getToken(jwt)
        .then(data => {
          if (data) {
            setProfileEmail(data.data.email)
            setLoggedIn(true)
            history.push('/');
          }
        })
        .catch(err => { console.log(err); })
    }
  }, [history]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setDeletePopupOpen(false)
    setCardToDelete(null);
    setInfoPopupOpen(false)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  function handleChangeAvatar(userInfo) {
    api.changeAvatar(userInfo).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  function handleAddPlace(newCard) {
    api.addNewCard(newCard).then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  function handleConfirmDelete(card) {
    setDeletePopupOpen(true)
    setCardToDelete(card);
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(data => {
        if (data) {
          console.log(data)
          setInfoPopupOpen(true);
          setRegistrationSuccessful(true);
          history.push('/sign-in');
        }
      })
      .catch(err => {
        setInfoPopupOpen(true);
        setRegistrationSuccessful(false);
        console.log(err);
      })
  }
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then(res => {
        if (res.token) {
          setProfileEmail(email)
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('/')
        }
      })
      .catch(err => {
        setInfoPopupOpen(true);
        setRegistrationSuccessful(false);
        console.log(err)
      })
  }
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setProfileEmail('')
    setLoggedIn(false);
    history.push('/sign-in');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={profileEmail} onSignOut={handleSignOut} />
          <Switch>
            <Route path='/sign-up'>
              <Register onRegister={handleRegister} />
            </Route>
            <Route path='/sign-in'>
              <Login onLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              exact path='/'
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDelete} />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <DeleteConfirmPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onConfirm={handleCardDelete} card={cardToDelete} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleChangeAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} isSuccessful={isRegistrationSuccessful} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;