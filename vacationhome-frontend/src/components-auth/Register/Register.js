import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import InputField from 'components/InputField/InputField'
import FieldMessage from 'components/FieldMessage/FieldMessage'
import Button from 'components/Button/Button'
import { useAuth } from 'context/auth'

// schema for form fields validation
const schema = yup.object().shape({
    username: yup.string().required().min(5).max(25),
    password: yup.string().required().min(6).max(40),
    email: yup.string().required().email(),
})

export default function Register() {
    const { user, signup } = useAuth()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [successful, setSuccessful] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) })

    const handleRegister = ({ username, email, password }) => {
        setLoading(true)
        setMessage('')

        signup(username, email, password)
            .then(({ message }) => {
                setSuccessful(true)
                setMessage(message)
            })
            .catch((error) => {
                setSuccessful(false)
                setMessage(error)
            })
            .finally(() => setLoading(false))
    }

    if (user) return <Redirect to="/profile" />

    return (
        <div className="register">
            <div className="register__card--container">
                <form onSubmit={handleSubmit(handleRegister)}>
                    {!successful && (
                        <div className="register__form--group">
                            <InputField label="Username" {...register('username')} />
                            <FieldMessage name="username" errors={errors} />

                            <InputField label="Email" type="email" {...register('email')} />
                            <FieldMessage name="email" errors={errors} />

                            <InputField
                                label="Password"
                                type="password"
                                {...register('password')}
                            />
                            <FieldMessage name="password" errors={errors} />

                            <div className="register__form--group">
                                <Button  className="btn btn--registration" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? 'alert alert-success' : 'alert alert-danger'
                                }
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


