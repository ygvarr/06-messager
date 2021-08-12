import React, {FC} from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {UserType} from '../../types/types'
import UsersSearchForm from './UsersSearchForm'
import {FilterType} from '../../redux/users-reducer'

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
const Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return (
        <>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            {users.map(u => <User
                user={u}
                followingInProgress={props.followingInProgress}
                key={u.id}
                unfollow={props.unfollow}
                follow={props.follow}
            />)}
        </>
    )
}
export default Users