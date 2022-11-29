import tomato from '../assets/tomato-svgrepo-com.svg'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useState, useEffect } from 'react'

type Props = {}

const Timer = (props: Props) => {
	dayjs.extend(duration)
	const [timeLeft, setTimeLeft] = useState(
		dayjs.duration({ minutes: 0, seconds: 10 })
	)
	const [isTimerOn, setIsTimerOn] = useState(false)

	useEffect(() => {
		setTimeLeft((prevTime) => prevTime.subtract(1, 's'))
		const interval = setInterval(() => {
			if (timeLeft.format('m:ss') === '0:00') {
				setIsTimerOn(false)
				console.log('happens')
			}
			if (isTimerOn) setTimeLeft((prevTime) => prevTime.subtract(1, 's'))
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [isTimerOn])

	return (
		<div>
			<img className='tomato' src={tomato} alt='Pomadoro Tomato Timer' />
			<p className='timer'>{timeLeft.format('m:ss')}</p>
			<button onClick={() => setIsTimerOn(true)}>start timer</button>
			<button onClick={() => setIsTimerOn(false)}>stop timer</button>
		</div>
	)
}

export default Timer
