import axios from 'axios'

// * API for search and channel Pages

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

export const axiosSearchAPI = axios.create({
	baseURL: BASE_URL,
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	},
})

// * API for video Page

const BASE_VIDEO_URL = 'https://youtube-v3-alternative.p.rapidapi.com'

export const axiosAPI = axios.create({
	baseURL: BASE_VIDEO_URL,
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com',
	},
})

// Don`t used
const options = {
	params: {
		maxResults: '50',
	},
	headers: {
		// 'X-RapidAPI-Key': __API_KEY__,
		'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	},
}

export const fetchFromApi = async (url) => {
	const { data } = await axios.get(`${BASE_URL}/${url}`, options)
	return data
}

// Don`t used
const videoOptions = {
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com',
	},
}

export const fetchVideoApi = async (url) => {
	const { data } = await axios.get(`${BASE_VIDEO_URL}/${url}`, videoOptions)
	return data
}
