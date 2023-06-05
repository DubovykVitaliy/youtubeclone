import { CheckCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { CardMedia, Stack, Typography, Box } from '@mui/material'

const VideoTitle = ({ videoData, channelData }) => {
	return (
		<Stack>
			<Typography
				variant='h5'
				fontWeight='bold'
				p={2}>
				{videoData.title && videoData.title}
			</Typography>

			<Stack
				direction='row'
				justifyContent='space-between'
				py={1}
				px={2}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='flex-start'>
					<Box
						height='40px'
						width='40px'
						mr={2}
						borderRadius='50%'
						sx={{
							backgroundColor: 'background.grey',
							overflow: 'hidden',
						}}>
						{channelData.channelAvatar && (
							<CardMedia
								image={channelData.channelAvatar}
								alt={channelData.channelTitle}
								sx={{
									height: '40px',
									width: '40px',
								}}
							/>
						)}
					</Box>
					<Stack
						alignItems='flex-start'
						justifyContent='center'>
						{channelData.channelTitle && (
							<Link to={`/channel/${videoData.channelId}`}>
								<Typography
									variant={{ sm: 'subtitle1', md: 'h6' }}
									color='text.primary'>
									{channelData.channelTitle}
									<CheckCircle
										sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
									/>
								</Typography>
							</Link>
						)}
						{channelData.subsCount && (
							<Typography
								variant={{ sm: 'subtitle1', md: 'subtitle1' }}
								color='text.primary'>
								{parseInt(channelData.subsCount).toLocaleString()} subscribers
							</Typography>
						)}
						{channelData.videoCount && (
							<Typography
								variant={{ sm: 'subtitle1', md: 'subtitle1' }}
								color='text.primary'>
								{parseInt(channelData.videoCount).toLocaleString()} videos
							</Typography>
						)}
					</Stack>
				</Stack>
				<Stack
					direction='row'
					gap='20px'
					alignItems='center'>
					{videoData.views && (
						<Typography
							variant='body1'
							sx={{ opacity: '0.7' }}>
							{parseInt(videoData.views).toLocaleString()} views
						</Typography>
					)}
					{videoData.likes && (
						<Typography
							variant='body1'
							sx={{ opacity: '0.7' }}>
							{parseInt(videoData.likes).toLocaleString()} likes
						</Typography>
					)}
				</Stack>
			</Stack>
		</Stack>
	)
}

export default VideoTitle
