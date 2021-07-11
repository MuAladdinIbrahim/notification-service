import EventEmitter from 'events';

let eventEmitter: any = null;

const GobalEventEmitter = () => {
    console.log({eventEmitter})
    if(!eventEmitter) eventEmitter = new EventEmitter();
    return eventEmitter;
}
export default GobalEventEmitter();