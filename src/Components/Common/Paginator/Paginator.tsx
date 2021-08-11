import React, {useState} from 'react'
import classes from './Paginator.module.css'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}
const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage = 1, onPageChanged = x => x, portionSize = 10}) => {
    const pages: Array<number> = []
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const max = pages.length
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    return (
        <div className={classes.NumPage}>
            <button
                className={classes.PageBtn}
                onClick={() => {
                    onPageChanged(1)
                    setPortionNumber(1)
                }}
                key={1}
            >FIRST
            </button>
            {portionNumber > 1 &&
            <button className={classes.PageBtn} onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span
                    className={currentPage === p ? classes.SelectedPage : undefined}
                    onClick={() => onPageChanged(p)}
                    key={p}>{p} </span>)}
            {portionCount > portionNumber &&
            <button className={classes.PageBtn} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
            <button
                className={classes.PageBtn}
                onClick={() => {
                    onPageChanged(max)
                    setPortionNumber(max / 10)
                }}
                key={max}
            >LAST
            </button>
        </div>
    )
}
export default Paginator