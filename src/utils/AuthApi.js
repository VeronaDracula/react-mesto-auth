class AuthApi {

    constructor(config) {
        this.url = config;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    register ({email, password}) {
        return fetch(this.url +'/signup', {
            method: 'POST',
            headers: {'Accept': 'application/json',
                      'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(response => {
                return this._getResponseData(response)
        })
    };




}

const baseUrl = 'https://auth.nomoreparties.co';

export const apiAuth = new AuthApi(baseUrl);



