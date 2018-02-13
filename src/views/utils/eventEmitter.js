import {EventEmitter} from 'fbemitter'
import {NativeEventEmitter, Platform} from 'react-native'
import logger from "./logger";

/**
 * Hold here a <<"private">> refSubscriptions' Map in order to prevent any external mutation
 * @type {Map}
 */
let refSubscriptions = new Map();

/**
 * Global emitter singleton
 * This class offers a simple way to debug your events by logging (in dev only)
 * the EventEmitter's main methods : addListener, removeListeners and emit actions */
class Emitter extends (Platform.OS === 'ios' ? EventEmitter : NativeEventEmitter) {
  static instance;

  constructor() {
    if (Emitter.instance) {
      return Emitter.instance
    }

    super();
    Emitter.instance = this
  }

  /**
   * Add a new subscription type, for a given ref, in the refSubscriptions' map
   * @param ref: the subscriber
   * @param eventType: event subscribed
   * @param callback: callback to execute after an emit
   */
  addListener(ref, eventType, callback) {
    let subscriptions = refSubscriptions.has(ref) ? refSubscriptions.get(ref) : [];
    subscriptions.push(super.addListener(eventType, callback));
    refSubscriptions.set(ref, subscriptions);

    const message = 'Register ' + eventType + ' for: ' + ref.constructor.name + '\nNew map is:';
    logger.info(message, refSubscriptions);
  }

  /** Only add a logger to EventEmitter.emit() function */
  emit(caller, eventType, ...param) {
    super.emit(eventType, ...param);

    const message = 'Emit' + eventType + ' from: ' + caller.constructor.name;
    logger.info(message)
  }

  /** Remove all subscriptions attached to a given ref */
  removeListeners(ref) {
    if (refSubscriptions.has(ref)) {
      refSubscriptions.get(ref).forEach((subscription) => {
        subscription.remove()
      });
      refSubscriptions.delete(ref);

      const message = 'Unregister all events for: ' + ref.constructor.name + '\nNew map is:';
      logger.info(message, refSubscriptions)
    }
  }
}

export default Emitter = new Emitter();