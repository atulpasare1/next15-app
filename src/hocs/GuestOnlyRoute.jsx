// Next Imports
import { redirect } from 'next/navigation'

// Third-party Imports
import { getServerSession } from 'next-auth'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Layout Imports
import GuestLayout from '@layouts/GuestLayout'

const GuestOnlyRoute = async ({ children, lang }) => {
  const session = await getServerSession()

  if (session) {
    redirect(getLocalizedUrl(themeConfig.homePageUrl, lang))
  }

  return <GuestLayout>{children}</GuestLayout>
}

export default GuestOnlyRoute
