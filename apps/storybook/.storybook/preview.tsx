import React from 'react'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import '../../../apps/web/app/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    chromatic: {
      modes: {
        light: {
          theme: 'light',
          className: 'light'
        },
        dark: {
          theme: 'dark',
          className: 'dark'
        }
      }
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light'
    }),
    Story => {
      return (
        // <ThemeProvider
        //   attribute="class"
        //   defaultTheme="system"
        //   enableSystem
        //   disableTransitionOnChange
        // >
        <div className="bg-background min-h-screen p-4">
          <Story />
        </div>
      )
    }
  ]
}

export default preview
