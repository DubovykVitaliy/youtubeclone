import { useState, useEffect, Suspense } from 'react'
import { Stack, Typography } from '@mui/material'

import { VideoChannel, VideoDescription, VideoStats } from './'
import { axiosAPI, axiosSearchAPI } from '../utils/fetchFromApi'
import wrapPromise from '../utils/wrapPromise'
import ErrorBoundary from '../utils/ErrorBoundary'
import { getItemFromDB, setItemInDB } from '../utils/localDB'

const VideoInfo = ({ id }) => {
	const [videoData, setVideoData] = useState(null)
	const [channelData, setChannelData] = useState(null)

	const getChannelData = async (chId, name) => {
		try {
			const response = await axiosSearchAPI.get(
				`/channels?id=${chId}&part=snippet%2Cstatistics`
			)
			setChannelData(response)
			setItemInDB(name, response, 7)
			console.log('Channel loaded')
		} catch (error) {
			console.log(error.message)
			setChannelData(null)
		}
	}

	useEffect(() => {
		let controller = new AbortController()

		const getData = async () => {
			try {
				const response = axiosAPI.get(`/video?id=${id}`, {
					signal: controller.signal,
				})
				const result = wrapPromise(response, `info-${id}`, getChannelData)
				setVideoData(result)
			} catch (error) {
				console.log(error.message)
				setVideoData(null)
				throw error
			}
		}

		if (id && getItemFromDB(`info-${id}`)) {
			console.log('loaded Video Info from local storage', id)
			setVideoData(getItemFromDB(`info-${id}`))
		} else {
			console.log('loaded Video Info from API', id)
			getData()
		}

		return () => {
			controller.abort()
		}
	}, [id])

	return (
		<Stack p={1}>
			<ErrorBoundary fallback='Error'>
				<Suspense fallback='Loading video title...'>
					<Typography
						variant={'h5'}
						fontWeight='bold'
						sx={{ fontSize: { xs: '1.1rem', md: '1.8rem' } }}>
						{videoData?.data.title}
					</Typography>
				</Suspense>
			</ErrorBoundary>
			<Stack
				direction='row'
				justifyContent='space-between'
				py={1}
				px={2}>
				<ErrorBoundary fallback='Error'>
					<Suspense fallback='Loading channel data...'>
						{channelData && <VideoChannel channelData={channelData} />}
					</Suspense>
				</ErrorBoundary>
				<ErrorBoundary fallback='Error'>
					<Suspense fallback='Loading video data...'>
						{videoData && <VideoStats videoData={videoData.data} />}
					</Suspense>
				</ErrorBoundary>
			</Stack>
			<ErrorBoundary fallback='Error'>
				<Suspense fallback='Loading description...'>
					<VideoDescription description={videoData?.data.description} />
				</Suspense>
			</ErrorBoundary>
		</Stack>
	)
}

export default VideoInfo
