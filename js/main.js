/**
 * Size of the ArrayBuffer in Megabytes
 * @type {Number}
 */
const bufferSizeMB = 1000
/**
 * Default case of using transferable objects
 * @type {Boolean}
 */
let useTransferableObject = false

/**
 * [addZeros description]
 * @method addZeros
 * @param  {Number}  [time='']
 * @param  {Number}  [length=2]    Length of the expected output string
 * @param  {Boolean} [prefix=true] Edit the beginning or end of the string
 * @return {String}
 */
const addZeros = (time = '', length = 2, prefix = true) => {
  const zeros = '0'.repeat(length - 1)

  if (prefix) return (zeros + time).slice(-length)

  return (time + zeros).slice(0, length)
}

/**
 * Get time at any given moment in 'HH:mm:ss.sss' format
 * @method getNow
 * @return {String}
 */
const getNow = () => {
  const now = new Date()

  return (
    addZeros(now.getHours()) + ':' +
    addZeros(now.getMinutes()) + ':' +
    addZeros(now.getSeconds()) + '.' +
    addZeros(now.getMilliseconds(), 3, false)
  )
}

/**
 * Create an inline worker from a function
 * @method getWorker
 * @param  {Function} workerFunc
 * @return {Worker}
 */
const getWorker = (workerFunc) => {
  const workerStr = workerFunc.toString()
  const workerCode = workerStr.substring(workerStr.indexOf('{') + 1, workerStr.lastIndexOf('}'))
  const blob = new Blob([workerCode], {type: "application/javascript"})

  return new Worker(window.URL.createObjectURL(blob))
}

/**
 * Append messages to #console element
 * @method logMsg
 * @param  {String} [msg='']
 * @param  {String} [caller=''] expecting 'worker' or 'thread'
 * @param  {String} [time='']
 */
const logMsg = (msg = '', caller = '', time = '') => {
  const html = (
    `<div>` +
      `${time}: ` +
      `<span class="${caller}">` +
        `${caller.toUpperCase()}: ${msg}` +
      `</span>` +
    `</div>`
  )

  document.getElementById('console').innerHTML += html
}

/**
 * Disable/enable the #submit button
 * @method toggleButtonDisabled
 * @param  {Boolean}            [disabled=false]
 */
const toggleButtonDisabled = (disabled = false) => {
  document.getElementById('submit').disabled = disabled
}


/**
 * UI FUNCTIONALITY
 */

/**
 * Create an ArrayBuffer and send it to the worker while logging progress
 * @method startWorker
 */
const startWorker = () => {
  // Disable button so there's only one operation running at any time
  toggleButtonDisabled(true)

  logMsg(`Creating data buffer: ${bufferSizeMB} Mb ...`, 'thread', getNow())

  /**
   * Add 100ms timeout so the above logMsg has time to complete before
   * new ArrayBuffer blocks the thread
   */
  setTimeout(() => {

    // Create a large ArrayBuffer to send to the worker
    const buffer = new ArrayBuffer(1024 * 1024 * bufferSizeMB)

    const content = [buffer]
    const readyMsg = ['Buffer ready, sending to worker']

    if (useTransferableObject) {
      content.push([buffer])
      readyMsg.push('using transferable object')
    }

    logMsg(readyMsg.join(' '), 'thread', getNow())

    setTimeout(() => msgWorker.postMessage(...content), 0)
  }, 100)
}

/**
 * Toggle the usage of transferable objects with workers
 * @method toggleTransferableObject
 */
const toggleTransferableObject = () => {
  useTransferableObject = !useTransferableObject
}


/**
 * DESCRIBE WORKERS
 */

const msgWorker = getWorker(() => {
  // Worker initialized
  self.postMessage('Ready!')

  // Send a message when worker received data
  self.addEventListener('message', e => {
    self.postMessage('Data received')
  }, false)
})


/**
 * INITIALIZE WORKER LISTENERS
 */

msgWorker.addEventListener('message', e => {
  // Print message from the worker
  logMsg(e.data, 'worker', getNow())

  // Enable button again
  toggleButtonDisabled(false)
}, false)
