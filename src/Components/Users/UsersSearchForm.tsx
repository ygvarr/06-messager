import classes from './Users.module.css'
import {Field, Form, Formik} from 'formik'
import React from 'react'
import {FilterType} from '../../redux/users-reducer'
import {useSelector} from 'react-redux'
import {getUsersFilter} from '../../redux/users-selectors'

const userSearchFormValidate = () => {
}
type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null'
const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <div className={classes.Wrapper}>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type='text' name='term'/>
                        <Field name='friend' as='select'>
                            <option value='null'>All</option>
                            <option value='true'>Followed</option>
                            <option value='false'>Unfollowed</option>
                        </Field>
                        <button type='submit' disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
export default UsersSearchForm