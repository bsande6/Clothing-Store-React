import {useState} from 'react'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFieds= () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = () => {

    }
      
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password)
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this eamil')
                    break
                default:
                    console.log(error)
            }
        
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
                    <Button type='button' buttonType='google' onclick={signInWithGoogle}>Google sign in</Button>
                </div>
       
             
            </form>
        </div>
    )
}

export default SignInForm