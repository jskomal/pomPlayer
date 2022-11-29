import dayjs from 'dayjs'
import './App.css'
import Timer from './components/Timer'

function App() {
	return (
		<div className='App'>
			<h1>pomPlayer</h1>
			<h2>it is {dayjs().format('h:mm a')}</h2>
			<Timer />
		</div>
	)
}

export default App
