import React from 'react'
import { Link } from 'react-router-dom'
import { CardMedia, Stack, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

const VideoChannel = ({ channelData }) => {
	const data = channelData?.data?.items[0]

	return (
		<Stack
			direction='row'
			alignItems='start'
			justifyContent='flex-start'>
			<CardMedia
				image={
					data?.snippet?.thumbnails.high.url && data.snippet.thumbnails.high.url
				}
				alt={data?.snippet?.title && data.snippet.title}
				sx={{
					borderRadius: '50%',
					height: '40px',
					width: '40px',
					mr: 2,
					border: '1px solid ',
					borderColor: 'primary.border',
					backgroundColor: 'background.lightGrey',
				}}
			/>
			<Stack
				alignItems='flex-start'
				justifyContent='center'>
				{data?.snippet?.title && (
					<Link to={`/channel/${data.id}`}>
						<Typography
							variant='subtitle1'
							color='text.primary'>
							{data.snippet.title}
							<CheckCircle
								sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
							/>
						</Typography>
					</Link>
				)}
				{data?.statistics?.subscriberCount && (
					<Typography
						variant='subtitle1'
						color='text.primary'>
						{parseInt(data.statistics.subscriberCount).toLocaleString()}{' '}
						subscribers
					</Typography>
				)}
				{data?.statistics?.videoCount && (
					<Typography
						variant='subtitle1'
						color='text.primary'>
						{parseInt(data.statistics.videoCount).toLocaleString()} videos
					</Typography>
				)}
			</Stack>
		</Stack>
	)
}

export default VideoChannel
