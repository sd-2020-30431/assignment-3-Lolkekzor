import Reflux from 'reflux';

const LoggedUserActions = Reflux.createActions([
    'login',
    'signup',
    'tokenAuthenticate',
    'logout'
])

export default LoggedUserActions;
