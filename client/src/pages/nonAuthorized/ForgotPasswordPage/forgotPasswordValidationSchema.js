import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup.object({
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    passwordConfirm: yup
        .string('Enter your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});