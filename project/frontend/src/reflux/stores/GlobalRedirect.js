import Reflux from 'reflux';
import GlobalRedirectActions from '../actions/GlobalRedirect';

class GlobalRedirectStore extends Reflux.Store{

    constructor(){
        super();
        this.state = {
          redirect: undefined
        };
        this.listenTo(GlobalRedirectActions.redirect, this.redirect);
    }

    redirect(url) {
      this.setState({
        redirect: url
      });
    }

}

export default GlobalRedirectStore;
