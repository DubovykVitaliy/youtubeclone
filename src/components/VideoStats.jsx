import React from 'react'
import { Stack, Typography } from '@mui/material'

const VideoStats = ({ videoData }) => {
	return (
		<Stack
			alignItems='end'
			sx={{ opacity: '0.8' }}>
			{videoData?.uploadDate && (
				<Stack
					justifyContent='right'
					flexDirection='row'
					alignItems='baseline'
					gap='0.3em'>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary' }}>
						Uploaded
					</Typography>
					<Typography
						variant='subtitle1'
						color='palette.text.primary'>
						{videoData.uploadDate}
					</Typography>
				</Stack>
			)}
			{videoData?.likes && (
				<Stack
					justifyContent='right'
					flexDirection='row'
					alignItems='baseline'
					gap='0.3em'>
					<Typography
						variant='subtitle1'
						color='text.primary'>
						{parseInt(videoData.likes).toLocaleString()}
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary' }}>
						Likes
					</Typography>
				</Stack>
			)}
			{videoData?.viewCount && (
				<Stack
					justifyContent='right'
					flexDirection='row'
					alignItems='baseline'
					gap='0.3em'>
					<Typography
						variant='subtitle1'
						color='text.primary'>
						{parseInt(videoData.viewCount).toLocaleString()}
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary' }}>
						Views
					</Typography>
				</Stack>
			)}
		</Stack>
	)
}

export default VideoStats
