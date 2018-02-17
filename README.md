# sloww
> Lightweight Slowloris attack CLI in Node

[GitHub](https://github.com/ethanent/sloww) | [NPM](https://www.npmjs.com/package/sloww)

## Install

```shell
npm i -g sloww
```

## Usage

> sloww --host domain.example --port 80

## Options

```
Usage:
sloww
	--host <required> string
	--port number - Default: 80
	--sockets number - Number of sockets to generate. Defaults to 200.
	--respawn boolean - Respawn dead sockets? Defaults to true.
	--rate number - Rate at which to send packets. (Milliseconds) Defaults to randomized 600-700.
	--help - Display this help menu
```

## Notes on legality

DDoS / DoS attacks are generally unlawful against others' systems. You are solely responsible for consequences arising in connection with your use of this software.

I (the author) do not endorse unlawful and/or non-white-hat use of this software. This tool is designed for research and personal server testing purposes.