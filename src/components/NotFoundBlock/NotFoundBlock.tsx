import React from 'react'
import { FC } from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: FC = () => {
	return (
			<h1 className={styles.root}>
				<span>😕</span>
				<br />
				Ничего не найдено
			</h1>
	)
}

export default NotFoundBlock
