import { Box, Typography } from '@mui/material'
import { Suspense } from 'react'
import { Videos } from '.'
import ErrorBoundary from '../utils/ErrorBoundary'

const Feed = ({ selectedCategory }) => {
	return (
		<Box
			p={1}
			// sx={{
			// 	overflowY: 'auto',
			// 	height: '90vh',
			// 	flex: 1,
			// }}
		>
			<Typography
				variant='h4'
				fontWeight='bold'
				p={1}
				mb={1}
				sx={{ color: 'text.primary' }}>
				{selectedCategory} <span style={{ color: '#fc1503' }}>videos</span>
			</Typography>
			<ErrorBoundary fallback='Error'>
				<Suspense fallback='Loading videos...'>
					<Videos searchTerm={selectedCategory} />
				</Suspense>
			</ErrorBoundary>
		</Box>
	)
}

export default Feed
