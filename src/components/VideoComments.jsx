import React from 'react'
import { Box, Button } from '@mui/material'

import { useEffect, useState } from 'react'
import { getItemFromDB } from '../utils/localDB'
import wrapPromise from '../utils/wrapPromise'
import { axiosAPI } from '../utils/fetchFromApi'
import { Comment } from './'
const VideoComments = ({ id }) => {
	const [comments, setComments] = useState(null)
	const [isCollapsed, setIsCollapsed] = useState('collapsed')

	useEffect(() => {
		let controller = new AbortController()

		const getData = async () => {
			try {
				const response = axiosAPI
					.get(`/comments?id=${id}&sort_by=newest`, {
						signal: controller.signal,
					})
					.then(({ data }) => data)
				const result = wrapPromise(response, `comments-${id}`)
				setComments(result)
			} catch (error) {
				console.log(error.message)
				setComments(null)
				throw error
			}
		}

		if (id && getItemFromDB(`comments-${id}`)) {
			console.log('loaded Comments from local storage', id)
			setComments(getItemFromDB(`comments-${id}`))
		} else {
			console.log('loaded Comments from API', id)
			getData()
		}

		return () => {
			controller.abort()
		}
	}, [id])

	return (
		<Box>
			<Box>
				{comments?.data?.slice(0, 3).map((item, idx) => {
					return (
						<Box key={idx}>
							<Comment item={item} />
						</Box>
					)
				})}
			</Box>
			<Box>
				{!isCollapsed &&
					comments?.data?.slice(3).map((item, idx) => {
						return (
							<Box key={idx}>
								<Comment item={item} />
							</Box>
						)
					})}
			</Box>

			<Button
				variant='contained'
				sx={{ width: '100%', textTransform: 'uppercase' }}
				onClick={() => setIsCollapsed(!isCollapsed)}>
				{isCollapsed ? 'More comments' : 'Less comments'}
			</Button>
		</Box>
	)
}

export default VideoComments
