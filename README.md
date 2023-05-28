# js-fast-emitter

## Description
`js-fast-emitter` is a lightweight npm library written in TypeScript that provides event emitter functionality. It allows you to easily manage and trigger events in your JavaScript applications.

## Installation
You can install `js-fast-emitter` using npm:

```shell
npm install js-fast-emitter

```

## Usage 

To use js-fast-emitter, import the Emitter class from the package:

```javascript
import Emitter from "js-fast-emitter"

```

Next, initialize a new instance of Emitter:

```javascript
const AppEmitter = new Emitter();
```

## Methods


### `add(eventName: string, listener: Function, options?: { once?: boolean, delay?: number }): void`
Adds a listener function for the specified event name.

- `eventName` (string): The name of the event to listen for.
- `listener` (Function): The listener function to be called when the event is emitted.
- `options` (object, optional): Additional options for the listener.
  - `once` (boolean, optional): If set to `true`, the listener will trigger once and then be automatically removed. Defaults to `false`.
  - `delay` (number, optional): The delay in milliseconds before the listener is triggered. Defaults to `0`.

**Returns:**
An object with a `remove` function that can be used to remove the added listener.

**Example:**

```javascript
// Listener triggered only once
AppEmitter.add('myEvent', (data) => {
  console.log('Event emitted:', data);
}, { once: true });

// Listener triggered with a delay of 1000 milliseconds
AppEmitter.add('myEvent', (data) => {
  console.log('Delayed event emitted:', data);
}, { delay: 1000 });

// Assign the listener to a const to remove it
const listener = AppEmitter.add('myEvent', (data) => {
  console.log('Event emitted:', data);
});

// Removing the listener
listenerObj.remove();

```

### `emit(eventName: string, params: any): void`
Emit a listener function for the specified event name.

- `eventName` (string): The name of the event to listen for.
- `params` (any): The listener params when the event is emitted.

**Example:**

```javascript
AppEmitter.emit('myEvent', { message: "Hello World!" });

```

### `getAllListeners(eventName?: string): Function[]`
Returns an array of listener functions for the specified event name. If no event name is provided, it returns all listener functions for all events.

- `eventName` (string, optional): The name of the event to get the listeners for.

**Example:**

```javascript
const listeners = AppEmitter.getAllListeners('myEvent');
console.log(listeners); // [Function]
```


