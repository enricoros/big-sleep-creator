const warn = console.warn;

/**
 * Base class for 'observing' value changes; typed, and with partial updates
 */
export class Subscribable<T> {
  private readonly value: T;
  private readonly subscribers: ((value: T) => void)[] = [];

  constructor(initialState: T) {
    if (!initialState) warn('Subscribable: use NOT NULL initial values!');
    this.value = initialState;
  }

  addSubscriber(listener: (value: T) => any) {
    if (this.subscribers.includes(listener)) return warn(`Subscribable.addSubscriber: ${listener} already registered`);
    this.subscribers.push(listener);
    // also immediately notify the current value to the subscriber
    listener(this.value);
  }

  removeSubscriber(listener: (value: T) => any) {
    if (!this.subscribers.includes(listener)) return warn(`Subscribable.removeSubscriber: ${listener} not present`);
    this.subscribers.splice(this.subscribers.indexOf(listener), 1);
  }

  partialUpdate(update: Partial<T>) {
    Object.assign(this.value, update);
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach(listener => listener(this.value));
  }

  // returns a copy of the object - not that referenced objects are still modifiable
  // copyUnsafe(): T {
  //   return {...this.value};
  // }
}
