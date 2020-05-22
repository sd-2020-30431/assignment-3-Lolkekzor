import Reflux from 'reflux';
import GlobalAlertActions from '../actions/GlobalAlert';

class GlobalAlertStore extends Reflux.Store{

    alertTime = 5000; // how long a message will be displayed ms

    constructor(){
        super();
        this.state = {
            alerts: []
        }
        this.listenTo(GlobalAlertActions.add, this.add);
        this.listenTo(GlobalAlertActions.remove, this.remove);
    }

    add(message, type){
        let alerts = this.state.alerts;
        let randomKey = Math.random() * 100000000;
        // Getting a random key to uniquely identify the current alert and
        // remove it with the timeout, and also keep the timeout id to stop
        // it in case the user dismisses the alert
        alerts.push({
            message: message,
            type: type,
            randomKey: randomKey,
            timeout: setTimeout( ()=>{this.removeKey(randomKey)}, this.alertTime )
        });
        this.setState({
            alerts: alerts
        });
    }

    removeKey(randomKey){
        let alerts = this.state.alerts;
        for(let i = 0 ; i < alerts.length ; i++){
            if(alerts[i].randomKey === randomKey){
                alerts.splice(i, 1);
                break;
            }
        }
        this.setState({
            alerts: alerts
        });
    }

    remove(index){
        let alerts = this.state.alerts;
        clearTimeout(alerts[index].timeout);
        alerts.splice(index, 1);
        this.setState({
            alerts: alerts
        });
    }

}

export default GlobalAlertStore;
