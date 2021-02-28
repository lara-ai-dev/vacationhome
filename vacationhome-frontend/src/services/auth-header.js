
//looks for a user object in local storage, Return HTTP Authorization header if there is a logged in user with accesstoken(JWT).
//Otherwise, an empty object would be returned

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };

    } else {
        return {};
    }
}
