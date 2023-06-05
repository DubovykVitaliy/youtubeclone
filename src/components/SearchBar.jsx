import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Search from '@mui/icons-material/Search'
import { IconButton, Paper, InputBase } from '@mui/material'

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()
		if (searchTerm) {
			navigate(`/search/${searchTerm}`)

			setSearchTerm('')
		}
	}

	return (
		<Paper
			elevation={2}
			component='form'
			onSubmit={handleSubmit}
			sx={{
				borderRadius: '20',
				border: '1px solid  ',
				borderColor: 'primary.border',
				pl: 1,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: { xs: '220px', sm: '300px', md: '360px' },
				boxShadow: 'none',
				transition: 'all, 0.4s',
				// mr: { sm: 3 },
				':focus-within': {
					outline: '2px solid ',
					outlineColor: 'outline.default',
					outlineOffset: '-4px',
					width: { xs: '240px', sm: '360px', md: '460px' },
				},
				'& input': {
					border: 'none',
					outline: 'none',
					fontSize: '1.2rem',
				},
			}}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder='Search...'
				value={searchTerm}
				inputProps={{ 'aria-label': 'Search...' }}
				onChange={(e) => {
					setSearchTerm(e.target.value)
				}}
			/>
			<IconButton
				type='submit'
				sx={{ p: { xs: '4px', sm: '6px', md: '10px' }, color: 'primary.main' }}>
				<Search />
			</IconButton>
		</Paper>
	)
}

export default SearchBar
