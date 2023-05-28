type ListenerType = {
  func: (store: any, newValue?: any) => void;
  options?: Options;
};
type EmitterType<E extends string> = Record<E, ListenerType[]>;

type Options = {
  /**
   * Determines whether the listener should be triggered once and then removed.
   * @example
   * once: true
   * @default false
   */
  once: boolean;

  /**
   * The delay in milliseconds before the listener is triggered.
   * @example
   * delay: 1000
   */
  delay?: number;
};

export default class Listener<E extends string, T> {
  private emitter;
  private options;
  constructor(options?: Options);
  add(
    event: E,
    listener: ListenerType["func"],
    options?: ListenerType["options"]
  ): {
    remove: () => void;
  };
  private remove;
  emit(event: E, params?: T): void;
  getAllListeners(): EmitterType<E>;
}
export {};
