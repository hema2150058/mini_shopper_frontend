import * as Yup from 'yup';

export const RegisterValidation = Yup.object({
    userName: Yup.string().label('Username').min(2).max(25).required("Please enter your name"),
    userEmail: Yup.string().label('Email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Enter a valid email')
      .required("Please enter your email"),
    userFirstName: Yup.string().label('Firstname').min(2).max(25).required('Please enter firstname'),
    userLastName: Yup.string().label('Lastname').min(2).max(25).required('Please enter firstname'),
    userPassword: Yup.string().min(6).label('Password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Enter a valid password")
      .required("Please enter your password"),
    confirmPassword: Yup.string().label('Confirm password').required('Please enter password')
      .oneOf([Yup.ref("userPassword"), null], "Password must match"),
    addressLine: Yup.string().label('Addressline').min(2).max(25).required('Please enter addressline'),
    street: Yup.string().label('Street').min(2).max(25).required('Please enter street name'),
    city: Yup.string().label('City').min(2).max(25).required('Please enter city'),
    state: Yup.string().label('State').min(2).max(25).required('Please enter state'),
    pincode: Yup.string().label('Pincode').min(2).max(25).required('Please enter pincode'),

  });