type ListenerType = {
  func: (store: any, newValue?: any) => void;
  options?: Options;
};

type EmitterType<E extends string> = Record<E, ListenerType[]>;

type Options = {
  /**
   * trigger the listener once
   */
  once: boolean;
  /**
   * delay in milliseconds
   * @example 1000 for 1 second
   */
  delay?: number;
};

const defaultOptions: Options = {
  once: false,
  delay: undefined,
};

export default class Listener<E extends string, T> {
  private emitter: EmitterType<E> = [] as EmitterType<E>;

  private options: Options = defaultOptions;

  constructor(options: Options = defaultOptions) {
    this.options = options;
  }

  add(
    event: E,
    listener: ListenerType["func"],
    options: ListenerType["options"] = this.options
  ): { remove: () => void } {
    let index = -1;
    let toReturn: any = undefined;

    if (typeof this.emitter[event] != "undefined") {
      //exist

      const listeners = this.emitter[event];

      for (let i = 0; i < listeners.length; i++) {
        if (typeof listeners[i] == "undefined" || typeof listeners[i] != "function") {
          index = i;
          break;
        }
      }

      if (index < 0) {
        index = this.emitter[event].length;
        this.emitter[event] = [...this.emitter[event], { func: listener, options }];
      } else {
        let listeners = this.emitter[event];
        listeners[index] = { func: listener, options };

        this.emitter[event] = listeners;
      }

      toReturn = {
        remove: () => this.remove(event, index),
      };
    } else {
      this.emitter[event] = [{ func: listener, options }];

      toReturn = {
        remove: () => this.remove(event, 0),
      };
    }

    return toReturn;
  }

  private remove(event: E, index: number) {
    if (typeof this.emitter[event][index] != "undefined") {
      delete this.emitter[event][index];
    }
  }

  emit(event: E, params?: T) {
    if (typeof this.emitter[event] != "undefined") {
      this.emitter[event].forEach((list, index) => {
        if (typeof list == "undefined") return;

        if (typeof list.func == "function") {
          let { options = this.options } = list;

          options = { ...this.options, ...options };

          if (typeof options.once != "undefined" && typeof options.once != "boolean") {
            console.error("'once' prop must be a boolean value");
          }
          if (typeof options.delay != "undefined" && typeof options.delay != "number") {
            console.error("'delay' prop must be a number");
          }

          setTimeout(() => {
            list.func(params);
          }, options.delay);

          if (typeof options.once == "boolean" && options.once) {
            this.remove(event, index);
          }
        }
      });
    }
  }

  getAllListeners() {
    return this.emitter;
  }

  // getEmitter() {
  //   console.log(this.emitter);
  //   return;
  // }
}
