// import './App.css'
import React, { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	Box,
	useMediaQuery,
	createTheme,
	ThemeProvider,
	CssBaseline,
	Stack,
} from '@mui/material'

import {
	ChannelPage,
	VideoPage,
	SearchFeedPage,
	NavBar,
	FeedPage,
	SideBar,
} from './components'
import ErrorBoundary from './utils/ErrorBoundary'

const App = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const prefMode = prefersDarkMode ? 'dark' : 'light'

	const getDesignTokens = (mode) => ({
		palette: {
			mode,
			...(mode === 'light'
				? {
						// palette values for light mode
						primary: {
							main: '#fc1503',

							border: '#9e9e9e',
						},
						background: {
							default: '#fff',
							paper: '#fff',
							lighter: '#fff',
							grey: '#aaa',
							lightGrey: '#ddd',
						},
						outline: {
							default: '#000',
						},
				  }
				: {
						// palette values for dark mode
						primary: {
							main: '#fc1503',
							border: '#e0e0e0',
						},
						background: {
							default: '#192231',
							paper: '#fff',
							lighter: '#24344d',
							lightGrey: '#ccc',
							// feed: ''
						},
						outline: {
							default: '#000',
						},
				  }),
		},
	})

	const theme = useMemo(
		() => createTheme(getDesignTokens(prefMode)),
		[prefMode]
	)

	const [selectedCategory, setSelectedCategory] = useState('New')

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Stack height={'100%'}>
					<NavBar />
					<Stack
						mx={'auto'}
						width={'min(100%, 1200px)'}
						height={'100%'}
						p={1}
						sx={{
							flexDirection: { xs: 'column', md: 'row' },
							flex: 1,
							overflowY: 'auto',
						}}>
						<SideBar
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
						/>
						<Box
							sx={{
								overflowY: 'auto',
								flex: 1,
							}}>
							<Routes>
								<Route
									path='/'
									exact
									element={
										<ErrorBoundary>
											<FeedPage
												selectedCategory={selectedCategory}
												setSelectedCategory={setSelectedCategory}
											/>
										</ErrorBoundary>
									}
								/>
								<Route
									path='/channel/:id'
									element={
										<ErrorBoundary>
											<ChannelPage />
										</ErrorBoundary>
									}
								/>
								<Route
									path='/video/:id'
									element={
										<ErrorBoundary>
											<VideoPage />
										</ErrorBoundary>
									}
								/>
								<Route
									path='/search/:searchTerm'
									element={
										<ErrorBoundary>
											<SearchFeedPage />
										</ErrorBoundary>
									}
								/>
							</Routes>
						</Box>
					</Stack>
				</Stack>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
