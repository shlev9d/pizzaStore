import React, { FC, useCallback, useEffect, useRef } from 'react'
import Categories from '../components/Categories'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Sort from '../components/Sort'
import Pagination from '../components/Pagination/Pagination'
import { useSelector } from 'react-redux'
import {
	selectFilter,
	setCategotyId,
	setCurrentPage,
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice'
import { useAppDispatch } from '../redux/store'





const Home: FC = () => {
	const dispatch = useAppDispatch()
	const isSearch = useRef(false)

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzasData)

	const onChangeCategory = useCallback( (idx: number) => {
		dispatch(setCategotyId(idx))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage) }))

		window.scrollTo(0, 0)
	}

	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams
	// 		const sort = list.find(obj => obj.sortProperty === params.sortBy)
		

	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category) ,
	// 				currentPage: Number(params.currentPage),
	// 				sort: sort || list[0]
	// 			})
	// 		)
	// 		isSearch.current = true
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify({
	// 			sortProperty: sort.sortProperty,
	// 			categoryId,
	// 			currentPage,
	// 		})

	// 		navigate(`?${queryString}`)
	// 	}

	// 	isMounted.current = true
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [categoryId, sort.sortProperty, currentPage])

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))

	const pizzas = items
		.filter((item: any) => {
			if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true
			}
			return false
		})
		.map((item: any) => <PizzaBlock key={item.id} {...item} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка</h2>
					<p>
						К сожалению, не удалость получить питцы. Попробуйте повторить
						попытку позже.
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
