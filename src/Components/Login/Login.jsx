import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Input} from '../Common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'}
                       component={Input}
                       validate={[required]}
                       placeholder={'Login'}/>
            </div>
            <div>
                <Field name={'password'}
                       component={Input}
                       validate={[required]}
                       placeholder={'Password'}/>
            </div>
            <div>
                <Field name={'rememberMe'}
                       component={Input}
                       type={'checkbox'}/>Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
export default Login