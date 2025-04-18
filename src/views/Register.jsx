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
  const [ispassword_confirmationShown, setIspassword_confirmationShown] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    resume: null,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    countryCode: '+1',
    location: '',
    password: '',
    password_confirmation: '',
    agreeToTerms: false
  })
  const [fileName, setFileName] = useState('')

  // Validation states
  const [errors, setErrors] = useState({
    resume: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    password_confirmation: '',
    agreeToTerms: ''
  })
  const [stepError, setStepError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const handleClickShowpassword_confirmation = () => setIspassword_confirmationShown(show => !show)

  // Validation functions
  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.resume) {
      newErrors.resume = 'Please upload a Resume';
      valid = false;
    } else {
      const fileType = formData.resume.type;
      const fileSize = formData.resume.size;
      const maxSize = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(fileType)) {
        newErrors.resume = 'Invalid file type. Only PDF, docx, and doc are allowed.';
        valid = false;
      } else if (fileSize > maxSize) {
        newErrors.resume = 'File size exceeds 2MB limit.';
        valid = false;
      } else {
      newErrors.resume = '';
    }
  }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
      valid = false;
    } else {
      newErrors.first_name = '';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
      valid = false;
    } else {
      newErrors.last_name = '';
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'phone number is required';
      valid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'phone number should contain only digits';
      valid = false;
    } else {
      newErrors.phone = '';
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

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
      valid = false;
    } else {
      newErrors.password_confirmation = '';
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

  const handleNext = async () => {
    if (activeStep === 0 && validateCurrentStep()) {
      setIsSubmitting(true);
      setStepError('');

      try {


        const formDataToSend = new FormData();
        formDataToSend.append('resume', formData.resume);

        const response = await fetch('https://testxlake.iitjobs.com/api/ai-register-step1', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json();
          console.log(result);
        if (!response.ok) {
          throw new Error(result.message || 'Failed to upload resume');
        }

        setFormData((prev) => ({
          ...prev,
          uploadedFileUrl: result.fileUrl || '',
          email: result.data.email || "",
          first_name: result.data.fname || "",
          last_name: result.data.lname || "",
          phone: result.data.phone || "",
          countryCode: result.data?.countryCode || "+91",
          location: result.data.location || "",

          resume: result.data.file_name || "",

        }));

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        setStepError(error.message || 'An error occurred during upload');
      } finally {
        setIsSubmitting(false);
      }
    } else if (activeStep === 1 && validateCurrentStep()) {
      setStepError('');
      setIsSubmitting(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('resume', formData.resume);
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('last_name', formData.last_name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('countryCode', formData.countryCode);
        formDataToSend.append('location', formData.location);

        const response = await fetch('https://testxlake.iitjobs.com/api/ai-register-step2', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json();
          console.log(result);
        if (!response.ok ) {
         // throw new Error(result.message || 'Failed to upload resume');
        }
        if (result.status === 'error' ) {
         if (result.errors) {
          // Transform server errors into field-specific error messages
          const formattedErrors = {};
          Object.keys(result.errors).forEach((field) => {
            // Take the first error message from the array (or join all if needed)
            formattedErrors[field] = result.errors[field][0];
            setErrors((prevErrors) => ({
              ...prevErrors,
              [field]: formattedErrors[field]
            }));

            setStepError(result.errors[field][0]);
          });

        } else {
          // Handle generic errors (e.g., 500 or no specific errors)
          setStepError(data.error || 'Failed to register. Please try again.');
        }
        }else{
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

      }
      catch (error) {
        setStepError(error.message || 'An error occurred during upload');
      }
      finally {
        setIsSubmitting(false);
      }


    } else {
      setStepError('Please fix the errors before proceeding');
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
  const submitRegistration = async (data) => {
    const response = await fetch('https://testxlake.iitjobs.com/api/ai-register-step3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      if (validateStep3()) {
        // Here you would handle the final submission
        setStepError('');
        setIsSubmitting(true);

        console.log('Form submitted:', formData);
        // Submit to your API or authentication service
        // For example, you might use a function like this:
        // const response = await submitRegistration(formData);
        const response =  submitRegistration(formData);
        if (!response.ok) {
          setStepError('Failed to register. Please try again.');
          setIsSubmitting(false);
          return;
        }

        // Example:
        // await submitForm(formData);
        // Reset form or redirect user
       // setActiveStep(0);

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
          color={errors.resume ? 'error' : 'primary'}
        >
          Upload File
          <VisuallyHiddenInput
            type="file"
            name="resume"
            onChange={handleChange}
            accept="image/*,.pdf"
          />
        </Button>
        {fileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected file: {fileName}
          </Typography>
        )}
        {errors.resume && (
          <Typography color="error" variant="caption" sx={{ mt: 1 }}>
            {errors.resume}
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
            name='first_name'
            value={formData.first_name}
            onChange={handleChange}
            placeholder='Enter your first name'
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <CustomTextField
            fullWidth
            label='Last Name'
            name='last_name'
            value={formData.last_name}
            onChange={handleChange}
            placeholder='Enter your last name'
            error={!!errors.last_name}
            helperText={errors.last_name}
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
            label='phone Number'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Enter your phone number'
            error={!!errors.phone}
            helperText={errors.phone}
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
          name='password_confirmation'
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder='············'
          type={ispassword_confirmationShown ? 'text' : 'password'}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowpassword_confirmation} onMouseDown={e => e.preventDefault()}>
                    <i className={ispassword_confirmationShown ? 'tabler-eye-off' : 'tabler-eye'} />
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

                {activeStep === steps.length - 1 ? 'Sign Up' : isSubmitting ? 'Uploading...' : 'Next'}
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
