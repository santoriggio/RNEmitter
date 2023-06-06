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
export default class Listener<E extends string, T> {
    private emitter;
    private options;
    constructor(options?: Options);
    add(event: E, listener: ListenerType["func"], options?: ListenerType["options"]): {
        remove: () => void;
    };
    private remove;
    emit(event: E, params?: T): void;
    getAllListeners(): EmitterType<E>;
}
export {};
