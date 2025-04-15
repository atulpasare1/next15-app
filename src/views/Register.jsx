'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 345,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Step titles
const steps = ['Upload Document', 'Personal Information', 'Security'];

const Register = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    countryCode: '+1',
    location: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [fileName, setFileName] = useState('')
  
  // Validation states
  const [errors, setErrors] = useState({
    profileImage: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  })
  const [stepError, setStepError] = useState('')

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // Hooks
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  // Validation functions
  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.profileImage) {
      newErrors.profileImage = 'Please upload a document';
      valid = false;
    } else {
      newErrors.profileImage = '';
    }
    
    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    } else {
      newErrors.firstName = '';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    } else {
      newErrors.lastName = '';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    } else {
      newErrors.email = '';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number should contain only digits';
      valid = false;
    } else {
      newErrors.mobile = '';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      valid = false;
    } else {
      newErrors.location = '';
    }
    
    setErrors(newErrors);
    return valid;
  };

  const validateStep3 = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else {
      newErrors.password = '';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      valid = false;
    } else {
      newErrors.agreeToTerms = '';
    }
    
    setErrors(newErrors);
    return valid;
  };

  const validateCurrentStep = () => {
    setStepError('');
    
    switch (activeStep) {
      case 0:
        return validateStep1();
      case 1:
        return validateStep2();
      case 2:
        return validateStep3();
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setStepError('Please fix the errors before proceeding.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStepError('');
  };

  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;
    
    if (type === 'file' && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setFileName(files[0].name);
      
      // Clear error when file is uploaded
      setErrors({
        ...errors,
        [name]: ''
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
      
      // Clear error when checkbox is checked
      if (checked) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Clear error when field is filled
      if (value.trim() !== '') {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      if (validateStep3()) {
        // Here you would handle the final submission
        console.log('Form submitted:', formData);
        // Submit to your API or authentication service
      } else {
        setStepError('Please fix the errors before submitting.');
      }
    }
  };

  // Step 1: File Upload
  const renderStep1 = () => (
    <>
      <div className='flex flex-col gap-1 mb-6'>
        <Typography variant='h5'>Step 1: Upload Your Document</Typography>
        <Typography>Please upload a profile picture or identification document</Typography>
      </div>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<i className="tabler-upload" />}
          sx={{ mb: 2 }}
          color={errors.profileImage ? 'error' : 'primary'}
        >
          Upload File
          <VisuallyHiddenInput 
            type="file" 
            name="profileImage"
            onChange={handleChange}
            accept="image/*,.pdf"
          />
        </Button>
        {fileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {fileName}
          </Typography>
        )}
        {errors.profileImage && (
          <Typography color="error" variant="caption" sx={{ mt: 1 }}>
            {errors.profileImage}
          </Typography>
        )}
      </Box>
    </>
  );

  // Step 2: Personal Information
  const renderStep2 = () => (
    <>
      <div className='flex flex-col gap-1 mb-6'>
        <Typography variant='h5'>Step 2: Personal Information</Typography>
        <Typography>Tell us a bit about yourself</Typography>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CustomTextField
            fullWidth
            label='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            placeholder='Enter your first name'
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <CustomTextField
            fullWidth
            label='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            placeholder='Enter your last name'
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Box>
        <CustomTextField
          fullWidth
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter your email'
          type='email'
          error={!!errors.email}
          helperText={errors.email}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CustomTextField
            select
            sx={{ width: '30%' }}
            label='Country Code'
            name='countryCode'
            value={formData.countryCode}
            onChange={handleChange}
          >
            <MenuItem value='+1'>+1 (US)</MenuItem>
            <MenuItem value='+44'>+44 (UK)</MenuItem>
            <MenuItem value='+91'>+91 (IN)</MenuItem>
            <MenuItem value='+61'>+61 (AU)</MenuItem>
            <MenuItem value='+86'>+86 (CN)</MenuItem>
          </CustomTextField>
          <CustomTextField
            fullWidth
            label='Mobile Number'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
            placeholder='Enter your mobile number'
            error={!!errors.mobile}
            helperText={errors.mobile}
          />
        </Box>
        <CustomTextField
          fullWidth
          label='Location'
          name='location'
          value={formData.location}
          onChange={handleChange}
          placeholder='Enter your location'
          error={!!errors.location}
          helperText={errors.location}
        />
      </Box>
    </>
  );

  // Step 3: Security
  const renderStep3 = () => (
    <>
      <div className='flex flex-col gap-1 mb-6'>
        <Typography variant='h5'>Step 3: Set Your Password</Typography>
        <Typography>Create a secure password for your account</Typography>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <CustomTextField
          fullWidth
          label='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='············'
          type={isPasswordShown ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <CustomTextField
          fullWidth
          label='Confirm Password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder='············'
          type={isConfirmPasswordShown ? 'text' : 'password'}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowConfirmPassword} onMouseDown={e => e.preventDefault()}>
                    <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <FormControlLabel
          control={
            <Checkbox 
              name='agreeToTerms'
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
          }
          label={
            <>
              <span>I agree to </span>
              <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                privacy policy & terms
              </Link>
            </>
          }
        />
        {errors.agreeToTerms && (
          <Typography color="error" variant="caption">
            {errors.agreeToTerms}
          </Typography>
        )}
      </Box>
    </>
  );

  // Render the current step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/login', locale)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          {/* <Logo /> */}
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          
          
          {/* <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            {stepError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {stepError}
              </Alert>
            )}
            
            {getStepContent(activeStep)}
            
            <Stack direction="row" spacing={2} justifyContent="space-between">
              {activeStep > 0 && (
                <Button onClick={handleBack} variant="outlined">
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ ml: activeStep === 0 ? 'auto' : 0 }}
              >
                {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
              </Button>
            </Stack>
            
            {activeStep === steps.length - 1 && (
              <>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>Already have an account?</Typography>
                  <Typography component={Link} href={getLocalizedUrl('/login', locale)} color='primary.main'>
                    Sign in instead
                  </Typography>
                </div>
                <Divider className='gap-2'>or</Divider>
                <div className='flex justify-center items-center gap-1.5'>
                  <IconButton className='text-facebook' size='small'>
                    <i className='tabler-brand-facebook-filled' />
                  </IconButton>
                  <IconButton className='text-twitter' size='small'>
                    <i className='tabler-brand-twitter-filled' />
                  </IconButton>
                  <IconButton className='text-textPrimary' size='small'>
                    <i className='tabler-brand-github-filled' />
                  </IconButton>
                  <IconButton className='text-error' size='small'>
                    <i className='tabler-brand-google-filled' />
                  </IconButton>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
