import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const VideoDescription = ({ description }) => {
	const [isCollapsed, setIsCollapsed] = useState('collapsed')

	if (description && description.length > 0) {
		return (
			<Box
				border='1px solid background.grey'
				backgroundColor='background.lightGrey'
				position='relative'
				fontSize='0.8rem'
				m={2}
				p={2}
				pb={4}
				mb={4}
				overflow='hidden'
				borderRadius='10px'
				sx={{
					height: isCollapsed ? '8em' : '100%',
					transition: 'all 0.5s',
				}}>
				<Typography variant='body1'>{description}</Typography>
				<Button
					sx={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						height: '20px',
						borderRadius: '0 0 10px 10px',
						backgroundColor: 'background.grey',
						':hover, :active': {
							backgroundColor: 'background.grey',
						},
					}}
					onClick={() => setIsCollapsed(!isCollapsed)}>
					<ExpandLessIcon
						sx={{
							rotate: isCollapsed ? '180deg' : '0deg',
							transition: 'all 0.2s',
							color: 'text.primary',
						}}
					/>
				</Button>
			</Box>
		)
	}
}

export default VideoDescription
