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
	const [totalTime, setTotalTime] = useState(
		dayjs.duration({ minutes: inputTime, seconds: 0 }).as('milliseconds')
	)
	const [isTimerStopped, setIsTimerStopped] = useState(true)
	const [timeLeftPercent, setTimeLeftPercent] = useState(1)
	const [userMessage, setUserMessage] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

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

	const handleInputTime = () => {
		if (inputRef.current !== null) {
			console.log(inputRef.current.value)
			if (
				parseInt(inputRef.current.value) > 0 &&
				parseInt(inputRef.current.value) <= 90
			) {
				setInputTime(parseInt(inputRef.current.value))
				setTimeLeft(
					dayjs.duration({
						minutes: parseInt(inputRef.current.value),
						seconds: 0,
					})
				)
				setTotalTime(
					dayjs
						.duration({
							minutes: parseInt(inputRef.current.value),
							seconds: 0,
						})
						.as('milliseconds')
				)
				setUserMessage('')
			} else {
				setUserMessage('Please enter a positive number between 1-90')
			}
		}
	}

	return (
		<div className='timer'>
			<img
				className='tomato'
				src={tomato}
				alt='Pomadoro Tomato Timer'
				style={{}}
			/>
			<p>{userMessage}</p>
			<p className='timer'>{timeLeft.format('m:ss')}</p>
			<button onClick={() => setIsTimerStopped(false)}>start timer</button>
			<button onClick={() => setIsTimerStopped(true)}>stop timer</button>
			{isTimerStopped && (
				<div className='input-pair'>
					<input
						className='timer-input'
						type='number'
						ref={inputRef}
						placeholder='set a custom time'
					/>

					<button onClick={handleInputTime}>set time</button>
				</div>
			)}
		</div>
	)
}

export default Timer
