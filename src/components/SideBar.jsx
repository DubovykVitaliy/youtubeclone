import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'

import { categories } from '../utils/constants.jsx'

const PureLink = styled(Link)`
	text-decoration: none;
	border: none;
	outline: none;
	box-shadow: none;
	tabindex: 0;
`

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
	return (
		<Stack
			sx={{
				overflow: 'auto',
				minWidth: '200px',
				p: { xs: 0.5, md: 1 },
				gap: { xs: 0.5, md: 1.5 },
				alignItems: 'center',
				flexDirection: { xs: 'row', md: 'column' },
				height: { xs: 'auto', md: '100%' },
				borderRight: { md: '1px solid ' },
			}}>
			{categories.map((category, idx) => (
				<PureLink
					to='/'
					key={category.name}
					tabIndex='-1'>
					<Button
						onClick={() => {
							setSelectedCategory(category.name)
						}}
						variant='contained'
						sx={{
							boxShadow: 'none',
							flexShrink: 0,
							wordWrap: 'nowrap',
							minWidth: '160px',
							backgroundColor:
								category.name === selectedCategory
									? 'primary.main'
									: 'background.default',
							color: 'text.primary',
							transition: 'all, 0.2s',
							borderRadius: '50px',
							justifyContent: 'start',
							':hover':
								category.name !== selectedCategory
									? {
											backgroundColor: 'primary.main',
											opacity: 0.4,
											transition: 'all, 0.2s',
									  }
									: { backgroundColor: 'primary.main' },
						}}
						startIcon={category.icon}>
						{category.name}
					</Button>
				</PureLink>
			))}
			<Typography
				className='copyright'
				variant='body2'>
				Copyright 2023 VD Studio
			</Typography>
		</Stack>
	)
}
export default SideBar
