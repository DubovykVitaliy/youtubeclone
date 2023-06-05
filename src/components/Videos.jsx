import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { ChannelCard, VideoCard } from './'
import { axiosSearchAPI } from '../utils/fetchFromApi'
import wrapPromise from '../utils/wrapPromise'
import { getItemFromDB } from '../utils/localDB'

const Videos = ({ searchTerm, vId, chId, xs, sm, md, lg, fontSize }) => {
	const [videos, setVideos] = useState(null)

	const getSearchedVideos = async (url, name, signal) => {
		try {
			const response = axiosSearchAPI.get(url, signal).then(({ data }) => data)
			const result = wrapPromise(response, `videos-${name}`)
			setVideos(result)
		} catch (error) {
			console.log(error.message)
			setVideos(null)
			throw error
		}
	}

	useEffect(() => {
		let controller = new AbortController()
		let _name

		if (vId) {
			_name = vId
		}
		if (chId) {
			_name = chId
		}
		if (searchTerm) {
			_name = searchTerm
		}
		console.log('loading videos...', _name)

		const fetchData = async () => {
			if (searchTerm !== undefined) {
				getSearchedVideos(
					`/search?part=snippet%2Cid&q=${searchTerm}&maxResults=50`,
					searchTerm,
					{
						signal: controller.signal,
					}
				)
			}
			if (vId !== undefined) {
				getSearchedVideos(
					`/search?part=snippet%2Cid&maxResults=50&relatedToVideoId=${vId}&type=video`,
					vId,
					{
						signal: controller.signal,
					}
				)
			}
			if (chId !== undefined) {
				getSearchedVideos(
					`/search?part=snippet%2Cid&maxResults=50&channelId=${chId}&order=date`,
					chId,
					{
						signal: controller.signal,
					}
				)
			}
		}

		if (_name && getItemFromDB(`videos-${_name}`)) {
			console.log('loaded Videos from local storage', _name)
			setVideos(getItemFromDB(`videos-${_name}`))
		} else {
			console.log('loaded Videos from API', _name)
			fetchData()
		}

		return () => {
			// setName(null)
			controller.abort()
		}
	}, [vId, searchTerm, chId])

	return (
		<Grid
			container
			spacing={2}
			p={1}
			sx={{
				gridAutoRows: '1fr',
				placeItems: 'center',
			}}>
			{videos?.items &&
				videos.items.map((item, idx) => (
					<Grid
						item
						key={idx}
						xs={xs ? xs : 12}
						sm={sm ? sm : 6}
						md={md ? md : 4}
						lg={lg ? lg : 3}>
						<Box>
							{item?.id?.playlistId && (
								<VideoCard
									video={item}
									fontSize={fontSize}
								/>
							)}
							{item?.id?.videoId && (
								<VideoCard
									video={item}
									fontSize={fontSize}
								/>
							)}
							{item?.id?.channelId && (
								<ChannelCard
									item={item}
									fontSize={fontSize}
								/>
							)}
						</Box>
					</Grid>
				))}
		</Grid>
	)
}

export default Videos
