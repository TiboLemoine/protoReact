import {defaultHeader, method, services} from './constants'

export default UserService = {

    getUser: (username) => {
        if (!username) {
            throw Error('Empty username is not authorized');
        }
        return fetch(`${services.BASE_URL}${services.USER}${username}`, {
            method: method.GET,
            headers: {...defaultHeader},
        })
            .then((response) => {
                    if (!response.ok) {
                        throw Error(response.status);
                    }
                    return Promise.all([null, response.json()])
                }
            )
            .catch((error) => {
                return Promise.all([error, null])
            });
    }
}