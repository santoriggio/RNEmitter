const defaultOptions = {
    once: false,
    delay: undefined,
};
export default class Listener {
    constructor(options = defaultOptions) {
        this.emitter = [];
        this.options = defaultOptions;
        this.options = options;
    }
    add(event, listener, options = this.options) {
        let index = -1;
        let toReturn = undefined;
        if (typeof this.emitter[event] != "undefined") {
            //exist
            const listeners = this.emitter[event];
            for (let i = 0; i < listeners.length; i++) {
                if (typeof listeners[i] == "undefined" || typeof listeners[i].func != "function") {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                index = this.emitter[event].length;
                this.emitter[event] = [...this.emitter[event], { func: listener, options }];
            }
            else {
                let listeners = this.emitter[event];
                listeners[index] = { func: listener, options };
                this.emitter[event] = listeners;
            }
            toReturn = {
                remove: () => this.remove(event, index),
            };
        }
        else {
            this.emitter[event] = [{ func: listener, options }];
            toReturn = {
                remove: () => this.remove(event, 0),
            };
        }
        return toReturn;
    }
    remove(event, index) {
        if (typeof this.emitter[event][index] != "undefined") {
            delete this.emitter[event][index];
        }
    }
    emit(event, params) {
        if (typeof this.emitter[event] != "undefined") {
            this.emitter[event].forEach((list, index) => {
                if (typeof list == "undefined")
                    return;
                if (typeof list.func == "function") {
                    let { options = this.options } = list;
                    options = Object.assign(Object.assign({}, this.options), options);
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
}
