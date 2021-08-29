import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from 'components/Button/Button'
import InputField from 'components/InputField/InputField'
import FieldMessage from 'components/FieldMessage/FieldMessage'
import { useAuth } from 'context/auth'

// schema for form fields validation
const schema = yup.object().shape({
    username: yup.string().required().min(5).max(25),
    password: yup.string().required().min(6).max(40),
})

const Login = (props) => {
        const { user, login } = useAuth()
        const history = useHistory()
        const [loading, setLoading] = useState(false)
        const [message, setMessage] = useState('')

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({ resolver: yupResolver(schema) })

        const handleLogin = ({ username, password }) => {
            setMessage('')
            setLoading(true)

            login(username, password)
                .then(() => history.push('/profile'))
                .catch((error) => setMessage(error))
                .finally(() => setLoading(false))
        }


    if (user) return <Redirect to="/profile" />

    return (
        <div className="logIn">
            <div className="logIn__card--container">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="logIn__form--group">
                    <InputField
                        label="Username"
                        {...register('username', { required: true })}
                    />
                    </div>
                    <FieldMessage name="username" errors={errors} />
                    <div className="logIn__form--group">
                    <InputField
                        label="Password"
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            maxLength: 30,
                        })}
                    />
                    </div>
                    <FieldMessage name="password" errors={errors} />

                    <div className="logIn__form--group">
                        <Button className="btn btn--registration" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </Button>
                    </div>

                    {message && (
                        <div className="logIn__form--group">
                            <div
                                data-testid="form-message"
                                className="alert alert-danger"
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login





