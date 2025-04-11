'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hooks Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

const Footer = ({ mode }) => {
  // Vars
  const footerImageLight = '/images/front-pages/footer-bg-light.png'
  const footerImageDark = '/images/front-pages/footer-bg-dark.png'

  // Hooks
  const dashboardImage = useImageVariant(mode, footerImageLight, footerImageDark)

  return (
    <footer className={frontLayoutClasses.footer}>
      <div className='relative'>
        <img src={dashboardImage} alt='footer bg' className='absolute inset-0 is-full bs-full object-cover -z-[1]' />
        <div className={classnames('plb-12 text-white', frontCommonStyles.layoutSpacing)}>
          <Grid container rowSpacing={10} columnSpacing={12}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <div className='flex flex-col items-start gap-6'>
                <Link href='/front-pages/landing-page'>
                  <Logo color='var(--mui-palette-common-white)' />
                </Link>
                <Typography color='white' className='md:max-is-[390px] opacity-[0.78]'>
                1340 S De Anza Blvd Ste # 208
              </Typography>
                <Typography color='white' className='md:max-is-[390px] opacity-[0.78]'>
                San Jose, CA 95129.
               </Typography>
                <Typography color='white' className='md:max-is-[390px] opacity-[0.78]'>
               support@iitjobs.com
               </Typography>

              </div>


            </Grid>
            <Grid size={{ xs: 12, sm: 3, lg: 2 }}>

              <div className='flex flex-col gap-4 pt-10'>
                 <Typography component={Link} href='/front-pages/pricing' color='white' className='opacity-[0.78]'>
                Jobs
                </Typography>
                <Typography component={Link} href='/front-pages/pricing' color='white' className='opacity-[0.78]'>
                Companies
                </Typography>
                <Link href='/about' className='flex items-center gap-[10px]'>
                  <Typography color='white' className='opacity-[0.78]'>
                  About Us
                  </Typography>
                  <Chip label='New' color='primary' size='small' />
                </Link>
                <Typography
                  component={Link}
                  href='/services'
                  color='white'
                  className='opacity-[0.78]'
                >
                Our Services
                </Typography>
                <Typography component={Link} href='/pages/misc/coming-soon' color='white' className='opacity-[0.78]'>
                Login
                </Typography>
              </div>

            </Grid>
            <Grid size={{ xs: 12, sm: 3, lg: 2 }}>

              <div className='flex flex-col gap-4 pt-10'>
                <Typography component={Link} href='/faq' color='white' className='opacity-[0.78]'>
                  FAQ
                </Typography>
                <Typography component={Link} href='/front-pages/landing-page' color='white' className='opacity-[0.78]'>
                Blogs
                </Typography>
                <Typography component={Link} href='/privacy-policy' color='white' className='opacity-[0.78]'>
                Privacy Policy
                </Typography>
                <Typography component={Link} href='/terms-conditions' color='white' className='opacity-[0.78]'>
                Terms of service
                </Typography>
                <Typography component={Link} href='/front-pages/landing-page' color='white' className='opacity-[0.78]'>
                Sitemap
                </Typography>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

            <div className='flex flex-col gap-2 items-start pt-10'>
  <span className='text-white text-sm font-medium'>Follow us on</span>
  <div className='flex gap-1.5 items-center'>
    <IconButton component={Link} size='small' href='https://github.com/pixinvent' target='_blank'>
      <i className='tabler-brand-github-filled text-white text-lg' />
    </IconButton>
    <IconButton component={Link} size='small' href='https://www.facebook.com/pixinvents/' target='_blank'>
      <i className='tabler-brand-facebook-filled text-white text-lg' />
    </IconButton>
    <IconButton component={Link} size='small' href='https://x.com/pixinvents' target='_blank'>
      <i className='tabler-brand-twitter-filled text-white text-lg' />
    </IconButton>
    <IconButton
      component={Link}
      size='small'
      href='https://www.youtube.com/channel/UClOcB3o1goJ293ri_Hxpklg'
      target='_blank'
    >
      <i className='tabler-brand-youtube-filled text-white text-lg' />
    </IconButton>
  </div>
</div>

            </Grid>
          </Grid>
        </div>
      </div>
      <div className='bg-[#211B2C]'>
        <div
          className={classnames(
            'flex flex-wrap items-center justify-center gap-4 plb-[15px]',
            frontCommonStyles.layoutSpacing
          )}
        >
          <Typography className='text-white' variant='body2'>


            © Copyright 2006 - 2025 All rights reserved.

          </Typography>

        </div>
      </div>
    </footer>
  )
}

export default Footer
