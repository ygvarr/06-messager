import {useSelector} from 'react-redux'
import React from 'react'
import Preloader from '../Common/Preloader/Preloader'
import {getIsFetching} from '../../redux/users-selectors'
import {Users} from './Users'

type UserPagePropsType = {
    pageTitle: string
}
export const UserPage: React.FC<UserPagePropsType> = () => {
    const isFetching = useSelector(getIsFetching)
    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}
