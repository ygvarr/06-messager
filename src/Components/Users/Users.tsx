import React, {FC, useEffect} from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {FilterType, requestUsers} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'

type PropsType = {}
export const Users: FC<PropsType> = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return (
        <>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            {users.map(u => <User
                user={u}
                followingInProgress={followingInProgress}
                key={u.id}
                unfollow={unfollow}
                follow={follow}
            />)}
        </>
    )
}