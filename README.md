# Web Workers Transferable Object test

**The purpose of this snippet was to test the speed difference of using and not
using Transferable Object with Web Workers.**

The thread creates a 1000 Mb [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
and sends it to the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker)
while logging the actions with timestamps. There should be a significant time
difference on how quickly the worker receives the buffer data when using and
not using [Transferable Object](https://developer.mozilla.org/en-US/docs/Web/API/Transferable).


## Getting started

Get you a copy of the project up and running on your local machine for
development and testing purposes. or check out the live demo at
https://mpaulasaari.github.io/web-worker-transferable-object-test/

### Prerequisites

Running this snippet depends on Node.js. If you don't have it installed download
it at https://nodejs.org/en/.

### Installation

- Clone the code repository

```bash
$ git clone git@github.com:mpaulasaari/web-worker-transferable-object-test.git
```

- Navigate to the cloned directory and install the dependencies

```bash
$ npm install
```

- Start the snippet and it will automatically open your browser at
`http://localhost:8080`

```bash
$ npm start
```

### Usage

Click the button to run the worker code. Note the delay as the worker
prompts the **Data received** message once it received the data from the thread.

Check the option **Use Transferable Object** and notice how the worker responds
almost instantly.


## Authors

- Mika Paulasaari - [github.com/mpaulasaari](https://github.com/mpaulasaari/)


## License

- None


## Acknowledgments

- Inspired by Eric Bidelman's similar [demo](http://html5-demos.appspot.com/static/workers/transferables/index.html).
