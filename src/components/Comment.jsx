import React from 'react'
import { Box, Stack, CardMedia, Typography } from '@mui/material'

const Comment = ({ item }) => {
	return (
		<Stack
			direction='row'
			p={2}
			// alignItems='start'
			// ref={(element) => itemEls.current.push(element)}
			// justifyContent='flex-start'
		>
			<Box sx={{ height: '36px', width: '36px', mr: 2 }}>
				<CardMedia
					// flex='2'
					image={item.authorProfileImageUrl[1].url}
					alt={item.authorDisplayName}
					sx={{
						borderRadius: '50%',
						height: '36px',
						width: '36px',

						border: '1px solid ',
						borderColor: 'primary.border',
					}}
				/>
			</Box>
			<Stack
				alignItems='flex-start'
				mb={1}>
				<Typography
					variant='subtitle1'
					color='text.primary'
					lineHeight='1.2'>
					{item.authorDisplayName}
				</Typography>
				<Typography
					variant='body2'
					color='text.primary'
					lineHeight='1.2'
					// sx={{
					// 	opacity: '0.8',
					// }}
				>
					{item.likesCount} likes
				</Typography>
				<Typography
					variant='body2'
					color='text.primary'
					lineHeight='1.2'
					sx={{
						opacity: '0.8',
					}}>
					{item.publishedTimeText}
				</Typography>
				<Box>
					<Typography
						variant='body1'
						color='text.primary'
						sx={{
							mt: 1,
						}}>
						{item.textDisplay}
					</Typography>
				</Box>
			</Stack>
		</Stack>
	)
}

export default Comment
