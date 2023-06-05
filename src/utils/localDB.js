const deleteItem = (key) => {
	window.localStorage.removeItem(key)
}
const isExpired = (time) => {
	const expired = time - Date.now()

	return expired < 0
}

const dBHasItem = (key) => {
	let data = window.localStorage.getItem(key)
	return data != null && data != undefined
}

export const getItemFromDB = (key) => {
	let item
	let _data = false
	let _time = false
	if (dBHasItem(key)) {
		try {
			item = JSON.parse(window.localStorage.getItem(key))
			_data = item.data
			_time = item.time
		} catch (e) {
			console.error(e)
		}
	}

	if (item === null || item === undefined) return false

	if (_time && isExpired(_time)) {
		deleteItem(key)
		return false
	}
	return _data
}

export const setItemInDB = (key, data, expire = 5) => {
	const time = new Date() + expire * 24 * 60 * 60 * 1000

	window.localStorage.setItem(
		key,
		JSON.stringify({
			time: time,
			data: data,
		})
	)
}
