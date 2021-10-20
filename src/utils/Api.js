class Api {

    constructor(config, authorization) {
        this.url = config.url;
        this.authorization = authorization;
        this.headers = {
            'Content-Type': 'application/json',
            'authorization': this.authorization
        }
    }


    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getCards () {
        return fetch(this.url + 'cards', {
            headers: this.headers
        }).then(response => {
           return this._getResponseData(response)
        })

    }

    createCardApi (data) {
        return fetch(this.url + 'cards', {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            return this._getResponseData(response)
        })

    }

    deleteCardApi (_id) {
        return fetch(this.url + 'cards' + '/' + _id, {
            headers: this.headers,
            method: 'DELETE',
        }).then(response => {
            return this._getResponseData(response)
        })
    }

    getUserInfoApi () {
        return fetch(this.url + 'users/me', {
            headers: this.headers
        }).then(response => {
            return this._getResponseData(response)
        })
    }

    createNewUserInfoApi (data) {
        return fetch(this.url + 'users/me', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(response => {
            return this._getResponseData(response)
        })
    }

    createNewUserAvatarApi (data) {
        return fetch(this.url + 'users/me/avatar', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(response => {
            return this._getResponseData(response)
        })
    }

    likeApi (_id) {
        return fetch(this.url + 'cards/likes/' + _id, {
            headers: this.headers,
            method: 'PUT'
        }).then(response => {
            return this._getResponseData(response)
        })
    }

    deleteLikedApi (_id) {
        return fetch(this.url + 'cards/likes/' + _id, {
            headers: this.headers,
            method: 'DELETE',
        }).then(response => {
            return this._getResponseData(response)
        })
    }
}


const url = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-27/'
}
const authorization = '8ab69193-abde-425d-8080-68fbeb2c2f47';


export const api = new Api(url, authorization);