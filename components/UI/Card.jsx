import { useContext } from 'react'
import Image from 'next/image'
import { StarFilled } from '@ant-design/icons'

import { handleMouseMove } from '@utils/handleMouseMove'
import styles from '@styles/Card.module.scss'
import { Context } from '@context/context'
import Button from '@components/UI/Button'
import AprValue from '@components/AprValue'

const Card = ({ data, aprValues }) => {
	const { theme, toggleTheme } = useContext(Context)
	const type = aprValues ? 'mainnet' : 'testnet'

	const handleOnMouseMove = e => {
		handleMouseMove(e)
	}

	const getExplorerLink = item => {
		return data[item].explorer === '' || data[item].explorer === undefined
			? `https://${type}.itrocket.net/${item.toLowerCase()}/staking`
			: data[item].explorer
	}

	const getDelegateLink = item => {
		return data[item].delegate || ''
	}

	return (
		<div className={styles.card__root}>
			{Object.entries(data).map(([item, value], index) => (
				<div
					className={styles.card}
					key={item}
					style={{ backgroundColor: theme === 'dark' ? '#222' : '#fff' }}
					onMouseMove={e => handleOnMouseMove(e)}
				>
					<div className={styles.card__desc}>
						<div className={styles.card__img}>
							<Image src={`/${type}/${data[item].imgUrl}`} alt='item' width={50} height={50} />
						</div>
						<div className='flex flex-col items-start'>
							<h5 className={styles.card__heading}>
								{data[item].name || item.charAt(0).toUpperCase() + item.slice(1)}
							</h5>
							{aprValues && (
								<div className='flex gap-[2px] md:gap-1 items-center tracking-wide text-[10px] md:text-sm '>
									<div>APR: </div>
									<span className='tracking-wide md:tracking-wide text-gray-500/80'>
										<AprValue aprValue={aprValues[item]} />
									</span>
								</div>
							)}
						</div>
					</div>

					{type === 'mainnet' && data[item].delegate && (
						<a
							href={getDelegateLink(item)}
							target='_blank'
							rel='noopener noreferrer'
							className='link'
							style={{ zIndex: 10 }}
						>
							Delegate funds
						</a>
					)}

					{data[item].fav === 'true' && (
						<div className={styles.card__star}>
							<StarFilled />
						</div>
					)}

					<div className={styles.button__wrapper}>
						<Button
							href={`/services/${aprValues ? 'mainnet' : 'testnet'}/${item.toLowerCase()}`}
							theme={theme}
						>
							Services
						</Button>
						<Button href={getExplorerLink(item)} theme={theme}>
							Explorer
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}

export default Card