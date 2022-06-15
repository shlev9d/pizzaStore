import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza:FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = useState<{
		imageUrl: string,
		title: string,
		price: number
	}>()
  const navigate = useNavigate()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://628e5d79368687f3e715cd36.mockapi.io/items/' + id
				)
				setPizza(data)
			} catch (error) {
				alert('error')
        navigate('/')
			}
		}
		fetchPizza()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!pizza) {
		return <>загрузка...</>
	}
	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='' />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}</h4>
		</div>
	)
}

export default FullPizza
