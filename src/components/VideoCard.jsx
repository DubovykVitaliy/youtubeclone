// prettier-ignore
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Box, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

const VideoCard = ({
	video: {
		id: { videoId },
		snippet,
	},
}) => {
	return (
		<Card
			fontSize='1rem'
			sx={{
				width: '100%',
				boxShadow: 'none',
				borderRadius: 0,
			}}>
			<Link to={videoId && `/video/${videoId}`}>
				<Box
					position='relative'
					width='100%'
					paddingBottom='56%'
					backgroundColor='background.lightGrey'>
					<CardMedia
						image={snippet?.thumbnails?.high?.url}
						alt={snippet?.title}
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							top: 0,
							left: 0,
						}}
					/>
				</Box>
			</Link>
			<CardContent
				sx={{
					backgroundColor: 'background.default',
					height: '8em',
					p: '0.5em',
				}}>
				<Link to={videoId && `/video/${videoId}`}>
					<Typography
						variant='subtitle1'
						fontSize='1.1rem'
						lineHeight='1.2'
						color='text.primary'
						fontWeight='500'>
						{snippet?.title.length > 0 && snippet?.title.slice(0, 60)}
					</Typography>
				</Link>
				<Link to={snippet?.channelId && `/channel/${snippet.channelId}`}>
					<Typography
						variant='subtitle2'
						fontWeight='bold'
						color='text.primary'
						sx={{ opacity: '0.8' }}>
						{snippet?.channelTitle.length && snippet.channelTitle}
						<CheckCircle sx={{ fontSize: 12, opacity: 0.7, ml: 2 }} />
					</Typography>
				</Link>
			</CardContent>
		</Card>
	)
}

export default VideoCard
