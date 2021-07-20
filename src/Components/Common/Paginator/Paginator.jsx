import React from 'react'
import classes from './Paginator.module.css'

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    const pages = []
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const max = pages.length
    pages.length = 10
    return (
        <div className={classes.NumPage}>
            {pages.map(p => <span
                className={currentPage === p ? classes.SelectedPage : null}
                onClick={(e) => onPageChanged(p)}
                key={p}>{p} </span>)}
            <span> ... </span>
            <span
                className={currentPage === max ? classes.SelectedPage : null}
                onClick={(e) => onPageChanged(max)}
                key={max}
            >{max}</span>
        </div>
    )
}
export default Paginator