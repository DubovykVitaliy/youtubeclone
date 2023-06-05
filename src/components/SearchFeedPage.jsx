import { Box, Typography } from '@mui/material'
import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Videos } from '.'
import ErrorBoundary from '../utils/ErrorBoundary'

const SearchFeed = () => {
	const { searchTerm } = useParams()

	return (
		<Box
			m={2}
			sx={{ flex: 1, overflowY: 'auto', height: '90vh' }}>
			<Typography
				variant='h4'
				fontWeight='bold'
				mb={2}>
				Search results for{' '}
				<span style={{ color: 'primary.main' }}>{searchTerm}</span> videos
			</Typography>

			<ErrorBoundary fallback='Error'>
				<Suspense fallback='Loading videos...'>
					<Videos searchTerm={searchTerm} />
				</Suspense>
			</ErrorBoundary>
		</Box>
	)
}

export default SearchFeed
