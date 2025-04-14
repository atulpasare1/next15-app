'use client'

// Third-party Imports
import classnames from 'classnames'

// Layout Imports
import BlankLayout from '@layouts/BlankLayout'

// Context Imports
import { SettingsProvider } from '@core/contexts/settingsContext'

const GuestLayout = ({ children }) => {
  return (
    <SettingsProvider>
      <BlankLayout systemMode="light">
        <div className="bg-black min-h-screen">
          {children}
        </div>
      </BlankLayout>
    </SettingsProvider>
  )
}

export default GuestLayout
