import tomato from '../assets/tomato-svgrepo-com.svg'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useState, useEffect, useRef } from 'react'

type Props = {}

const Timer = (props: Props) => {
	dayjs.extend(duration)
	const [inputTime, setInputTime] = useState(25)
	const [timeLeft, setTimeLeft] = useState<duration.Duration>(
		dayjs.duration({ minutes: inputTime, seconds: 0 })
	)
	const [totalTime] = useState(
		dayjs.duration({ minutes: inputTime, seconds: 0 }).as('milliseconds')
	)
	const [isTimerStopped, setIsTimerStopped] = useState(true)
	const [timeLeftPercent, setTimeLeftPercent] = useState(1)
	const [userMessage, setUserMessage] = useState('')
	const inputRef = useRef(null)

	useEffect(() => {
		let interval: number | undefined

		if (!isTimerStopped) {
			interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev.get('seconds') === 0 && prev.get('minutes') === 0) {
						clearInterval(interval)
						return prev
					} else {
						return prev.subtract(1, 's')
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

	useEffect(() => {
		setTimeLeftPercent(() => timeLeft.as('milliseconds') / totalTime)
	}, [timeLeft])

	const handleInputTime = () => {}

	return (
		<div>
			<img className='tomato' src={tomato} alt='Pomadoro Tomato Timer' />
			<p>{userMessage}</p>
			<p className='timer'>{timeLeft.format('m:ss')}</p>
			<button onClick={() => setIsTimerStopped(false)}>start timer</button>
			<button onClick={() => setIsTimerStopped(true)}>stop timer</button>
			{isTimerStopped && (
				<input
					type='number'
					value={inputTime}
					onChange={(e) => setInputTime(parseInt(e.target.value))}
				/>
			)}
			<button onClick={handleInputTime}>set time</button>
		</div>
	)
}

export default Timer
