import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import SearchBar from './SearchBar'

const NavBar = () => {
	return (
		<Stack
			direction='row'
			alignItems='center'
			p={1}
			px={2}
			width={'min(100%, 1280px)'}
			sx={{
				backgroundColor: 'background.default',
				justifyContent: 'space-between',
				marginInline: 'auto',
			}}>
			<Link
				to='/'
				style={{ display: 'flex', alignItems: 'center' }}>
				<img
					src={logo}
					alt='logo'
					height={36}
					width={36}
				/>
			</Link>
			<SearchBar />
		</Stack>
	)
}
export default NavBar
