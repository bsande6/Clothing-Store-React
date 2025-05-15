import {useState, useContext} from 'react'
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'

import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const dispatch = useDispatch()

    const resetFormFieds= () => {
        setFormFields(defaultFormFields)
    }
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFieds()
        } catch(error) {
            if (error.code == 'auth/email-already-in-use') {
                alert("email already in use")
            }
            console.log('user creation encountered an error', error)

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]:value})
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account. Sign Up</h2>
            <span> Sign up with your email and password </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                        label="Display Name"
                        type='text'
                        required
                        onChange={handleChange}
                        name='displayName'
                        value={displayName}
                />
                
                <FormInput
                        label="Email"
                        type='email'
                        required
                        onChange={handleChange}
                        name='email'
                        value={email}
                />
                   <FormInput
                        label="Password"
                        type='password'
                        required
                        onChange={handleChange}
                        name='password'
                        value={password}
                />
       
               
                <FormInput
                        label="Confirm Password "
                        type='passworrd'
                        required
                        onChange={handleChange}
                        name='confirmPassword'
                        value={confirmPassword}
                />

                <Button buttonType='inverted' type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm