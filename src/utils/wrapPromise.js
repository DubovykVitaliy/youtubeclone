import { setItemInDB } from './localDB'

function wrapPromise(promise, dbName, getChannelData) {
	let status = 'pending'
	let result

	const suspender = promise
		.then((res) => {
			console.log('API Data loaded...')
			status = 'success'
			result = res
			setItemInDB(dbName, result, 7)
			if (getChannelData) {
				getChannelData(res.data.channelId, `chInfo-${res.data.channelId}`)
			}
		})
		.catch((error) => {
			console.log('API Data loading error...', error)
			status = 'error'
			result = error
		})

	// throw suspender tell Suspender that promise not resolved
	// throw response tell Suspender that promise resolved with error and ErrorBoundary must be started

	return () => {
		switch (status) {
			case 'pending':
				throw suspender
			case 'success':
				return result
			case 'error':
				throw result
			default:
				throw new Error('Unknown status')
		}
	}
}

export default wrapPromise
