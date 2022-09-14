const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '39312d8e-ee71-4289-83fa-7acec5025715',
    'Content-Type': 'application/json'
  }
}

const checkRes = (res, error) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(error);
};

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => checkRes(res, 'Произошла ошибка при получении данных пользователя...'))
};

export const patchProfileInput = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
    .then(res => checkRes(res, 'Произошла ошибка при отправке данных пользователя...'))
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(res => checkRes(res, 'Произошла ошибка при получении карточек...'))
};

export const sendCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
    .then(res => checkRes(res, 'Произошла ошибка при загрузке карточки...'))
};

export const removeCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => checkRes(res, 'Произошла ошибка при удалении карточки...'))
};

export const toggleLike = (cardId, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  })
    .then(res => checkRes(res, 'Произошла ошибка при обработке лайка...'))
}

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    })
  })
    .then(res => checkRes(res, 'Произошла ошибка при загрузке аватара профиля...'))
}
