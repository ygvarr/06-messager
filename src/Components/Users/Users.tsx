import React, { FC, useEffect } from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'

type PropsType = {}
type QueryParamsType = { term?: string; page?: string; friend?: string }
export const Users: FC<PropsType> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search.substr(1)
    ) as QueryParamsType
    let actualPage = currentPage
    let actualFilter = filter
    if (!!parsed.page) actualPage = Number(parsed.page)
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string }
    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
    //eslint-disable-next-line
  }, [])
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsers)
  const followingInProgress = useSelector(getFollowingInProgress)
  const history = useHistory()
  useEffect(() => {
    const query: QueryParamsType = {}
    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)
    history.push({
      pathname: '/developers',
      search: queryString.stringify(query),
    })
  }, [filter, currentPage, history])
  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const followFn = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowFn = (userId: number) => {
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
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      {users.map(u => (
        <User
          user={u}
          followingInProgress={followingInProgress}
          key={u.id}
          unfollow={unfollowFn}
          follow={followFn}
        />
      ))}
    </>
  )
}
