export const EVENT_VERSION_DIVIDER = '::'

export const REMOTE_LOCAL = 'http://127.0.0.1:8081'
export const REMOTE_DEV = 'https://developer.mercury.spruce.ai'
export const REMOTE_DEMO = 'https://demo.mercury.spruce.ai'
export const REMOTE_HEARTWOOD_TEST = 'https://heartwood.mercury.spruce.ai'
export const REMOTE_SANDBOX = 'https://sandbox.mercury.spruce.ai'
export const REMOTE_PROD = 'https://mercury.spruce.ai'

export const REMOTES = {
	local: REMOTE_LOCAL,
	developer: REMOTE_DEV,
	demo: REMOTE_DEMO,
	sandbox: REMOTE_SANDBOX,
	production: REMOTE_PROD,
	heartwood_test: REMOTE_HEARTWOOD_TEST,
}

export type Remote = keyof typeof REMOTES
