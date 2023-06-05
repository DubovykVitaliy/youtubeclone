import React from 'react'
import { Box, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const ChannelCard = ({ channelDetail, item, imageSize, fontSize }) => {
	let data = {}
	if (channelDetail) {
		// data = channelDetail?.data?.items[0]
		data.id = channelDetail?.data?.items[0]?.id
		data.title = channelDetail?.data?.items[0]?.snippet?.title
		data.url = channelDetail?.data?.items[0]?.snippet?.thumbnails?.high?.url
		data.subscriberCount =
			channelDetail?.data?.items[0]?.statistics?.subscriberCount
		data.videoCount = channelDetail?.data?.items[0]?.statistics?.videoCount
		// console.log(data)
	}
	if (item) {
		data.id = item?.snippet?.channelId
		data.title = item?.snippet?.channelTitle
		data.url = item?.snippet?.thumbnails?.high?.url
		// console.log(data)
	}
	return (
		<Box
			sx={{
				boxShadow: 'none',
				borderRadius: '20px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				// width: { xs: '356px', md: '320px' },
				// height: '326px',
				margin: 'auto',
				// marginTop: marginTop,
				backgroundColor: 'transparent',
			}}>
			<Link to={`/channel/${data?.id}`}>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
						alignItems: 'center',
						textAlign: 'center',
						color: 'text.primary',
						// py: '0',
					}}>
					<CardMedia
						image={data?.url}
						alt={data?.title}
						sx={{
							borderRadius: '50%',
							height: imageSize ? imageSize : '160px',
							width: imageSize ? imageSize : '160px',
							mb: 2,
							border: '2px solid ',
							borderColor: 'primary.border',
						}}
					/>
					<Stack
						direction='row'
						gap='0.4em'
						alignItems='start'
						justifyContent='center'
						sx={{ py: '0.4em' }}>
						<Typography
							variant='title4'
							sx={{
								fontSize: fontSize || '1.3rem',
								lineHeight: '1',
								fontWeight: '500',
							}}>
							{data?.title}{' '}
						</Typography>
						<CheckCircle sx={{ fontSize: 16, opacity: '0.6' }} />
					</Stack>
					{data?.subscriberCount && (
						<Stack
							direction='row'
							alignItems='center'
							gap='0.2em'>
							<Typography
								variant='subtitle1'
								sx={{ fontWeight: 700 }}>
								{parseInt(data?.subscriberCount, 10).toLocaleString()}
							</Typography>
							<Typography variant='body1'>Subscribers</Typography>
						</Stack>
					)}
					{data?.videoCount && (
						<Stack
							direction='row'
							alignItems='center'
							gap='0.2em'>
							<Typography
								variant='subtitle1'
								sx={{ fontWeight: 700 }}>
								{parseInt(data.videoCount).toLocaleString()}
							</Typography>
							<Typography variant='body1'>videos</Typography>
						</Stack>
					)}
				</CardContent>
			</Link>
		</Box>
	)
}

export default ChannelCard
