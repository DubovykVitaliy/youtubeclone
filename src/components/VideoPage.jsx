import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Box, Stack } from '@mui/material'

import { VideoInfo, Videos, VideoComments } from '.'
import ErrorBoundary from '../utils/ErrorBoundary'

const VideoPage = () => {
	const { id } = useParams()

	return (
		<ErrorBoundary fallback='Error'>
			<Stack
				direction={{ xs: 'column', md: 'row' }}
				sx={{ height: { xs: 'auto', md: '100% ' } }}>
				<Box
					sx={{
						height: { xs: 'auto', md: '100%' },
						width: { xs: '100%', md: '75%' },
						overflowY: 'auto',
						backgroundColor: 'background.lighter',
						p: 1,
						pb: 3,
					}}>
					<Box className='player-wrapper'>
						<ReactPlayer
							className='react-player'
							url={`https//www.youtube.com/watch?v=${id}`}
							controls
							width='100%'
							height='100%'
						/>
					</Box>

					<ErrorBoundary fallback='Error'>
						<Suspense fallback='Loading video Info...'>
							<VideoInfo id={id} />
						</Suspense>
					</ErrorBoundary>
					<ErrorBoundary fallback='Error'>
						<Suspense fallback='Loading Video Comments...'>
							<VideoComments id={id} />
						</Suspense>
					</ErrorBoundary>
				</Box>
				<Box
					width={{ xs: '100%', md: '25%' }}
					sx={{
						height: { xs: 'auto', md: '100%' },
						overflowY: 'auto',
					}}>
					<ErrorBoundary fallback='Error'>
						<Suspense fallback='Loading videos...'>
							<Videos
								vId={id}
								xs={12}
								sm={6}
								md={12}
								lg={12}
							/>
						</Suspense>
					</ErrorBoundary>
				</Box>
			</Stack>
		</ErrorBoundary>
	)
}

export default VideoPage
