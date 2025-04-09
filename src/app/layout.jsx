// MUI Imports
import Button from '@mui/material/Button'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Context Imports
import { IntersectionProvider } from '@/contexts/intersectionContext'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import FrontLayout from '@components/layout/front-pages'
import ScrollToTop from '@core/components/scroll-to-top'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'iitjobs - Global Tech Job Portal | IT, Software & Remote Jobs - iitjobs',
  description:
    'Explore 90,000+ IT, software engineering, and remote tech jobs worldwide on iitjobs. Fast hiring, easy applications, and top employers! Find your dream job today.',
  keywords:
    'iitjobs, job portal, job search, IT jobs, software jobs, remote jobs, tech jobs, global jobs, fast hiring, easy applications, top employers',
  openGraph: {
    title: 'iitjobs - Global Tech Job Portal | IT, Software & Remote Jobs - iitjobs',
    description:
      'Explore 90,000+ IT, software engineering, and remote tech jobs worldwide on iitjobs. Fast hiring, easy applications, and top employers! Find your dream job today.',
    url: 'https://www.iitjobs.com/',
    siteName: 'iitjobs',
    images: [
      {
        url: '/images/social-share.png',
        width: 1200,
        height: 630,
        alt: 'iitjobs - Global Tech Job Portal | IT, Software & Remote Jobs - iitjobs'
      }
    ],
    locale: 'en-US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iitjobs - Global Tech Job Portal | IT, Software & Remote Jobs - iitjobs',
    description:
      'Explore 90,000+ IT, software engineering, and remote tech jobs worldwide on iitjobs. Fast hiring, easy applications, and top employers! Find your dream job today.',
    images: '/images/social-share.png'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  },
  manifest: '/manifest.json'
}

const Layout = async ({ children }) => {
  // Vars
  const systemMode = await getSystemMode()

  return (
    <html id='__next' suppressHydrationWarning>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        <Providers direction='ltr'>
          <BlankLayout systemMode={systemMode}>
            <IntersectionProvider>
              <FrontLayout>
                {children}
                <ScrollToTop className='mui-fixed'>
                  <Button
                    variant='contained'
                    className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
                  >
                    <i className='tabler-arrow-up' />
                  </Button>
                </ScrollToTop>
              </FrontLayout>
            </IntersectionProvider>
          </BlankLayout>
        </Providers>
      </body>
    </html>
  )
}

export default Layout
