import { Box } from '@mui/material'
import { useEffect, useState, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'

import { ChannelCard, Videos } from '.'
import { axiosSearchAPI } from '../utils/fetchFromApi'
import ErrorBoundary from '../utils/ErrorBoundary'
import wrapPromise from '../utils/wrapPromise'
import { getItemFromDB } from '../utils/localDB'

const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null)

	const { id } = useParams()

	useEffect(() => {
		let controller = new AbortController()

		const getData = async () => {
			try {
				const response = axiosSearchAPI.get(
					`/channels?id=${id}&part=snippet%2Cstatistics`,
					{
						signal: controller.signal,
					}
				)
				const result = wrapPromise(response, `chInfo${id}`)
				setChannelDetail(result)
			} catch (error) {
				console.log(error.message)
				setChannelDetail(null)
				throw error
			}
		}

		if (id && getItemFromDB(`info${id}`)) {
			console.log('loaded from local storage', id)
			setChannelDetail(getItemFromDB(`chInfo${id}`))
		} else {
			console.log('loaded from API', id)
			getData()
		}
		return () => {
			controller.abort()
		}
	}, [id])

	const StyledDiv = styled.div`
		background-image: linear-gradient(
			90deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(66, 9, 121, 1) 50%,
			rgba(255, 0, 197, 1) 100%
		);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: -10;
		width: 100%;
		height: 150px;
	`
	return (
		<Box>
			<ErrorBoundary fallback='Error'>
				<Suspense fallback='Loading video Info...'>
					<Box
						pt='20px'
						position='relative'>
						<StyledDiv />
						<ChannelCard
							channelDetail={channelDetail}
							fontSize={'2rem'}
							imageSize={'240px'}
						/>
					</Box>
				</Suspense>
			</ErrorBoundary>

			<Box
				display='flex'
				p='2'>
				<ErrorBoundary fallback='Error'>
					<Suspense fallback='Loading Videos...'>
						<Videos chId={id} />
					</Suspense>
				</ErrorBoundary>
			</Box>
		</Box>
	)
}

export default ChannelDetail
