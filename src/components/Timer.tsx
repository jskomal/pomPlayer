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
	const [isTimerStopped, setIsTimerStopped] = useState(true)

	useEffect(() => {
		let interval: number | undefined

		if (!isTimerStopped) {
			interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev.get('seconds') !== 0) {
						return prev.subtract(1, 's')
					} else {
						clearInterval(interval)
						return prev
					}
				})
			}, 1000)
		} else {
			clearInterval(interval)
		}

		return () => {
			clearInterval(interval)
		}
	}, [isTimerStopped])

	return (
		<div>
			<img className='tomato' src={tomato} alt='Pomadoro Tomato Timer' />
			<p className='timer'>{timeLeft.format('m:ss')}</p>
			<button onClick={() => setIsTimerStopped(false)}>start timer</button>
			<button onClick={() => setIsTimerStopped(true)}>stop timer</button>
		</div>
	)
}

export default Timer
