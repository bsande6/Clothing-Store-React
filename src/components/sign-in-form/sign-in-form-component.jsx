import {useState} from 'react'
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}


const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFieds= () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }
      
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            dispatch(emailSignInStart(email, password))
            resetFormFieds()
        } catch (error) {
           console.log("user sign in failed", error)
        }

        try {
       
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
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password </span>
            <form onSubmit={handleSubmit}>
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

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </div>
       
             
            </form>
        </div>
    )
}

export default SignInForm