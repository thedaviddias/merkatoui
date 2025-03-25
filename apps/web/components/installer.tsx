'use client'

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger
} from '@merkatoui/snippet'
import { track } from '@vercel/analytics/react'
import { useState } from 'react'
import { toast } from 'sonner'

type InstallerProps = {
  packageName: string
}

export const Installer = ({ packageName }: InstallerProps) => {
  const [value, setValue] = useState('merkatoui')

  const commands = {
    merkatoui: {
      code: `npx merkatoui@latest add ${packageName}`
    },
    shadcn: {
      code: `npx shadcn@latest add https://merkatoui.com/r/${packageName}.json`
    }
  }

  return (
    <Snippet
      value={value}
      onValueChange={setValue}
      className="not-prose shiki shiki-themes github-light github-dark"
    >
      <SnippetHeader>
        <SnippetTabsList>
          {Object.entries(commands).map(([key, command]) => (
            <SnippetTabsTrigger key={key} value={key}>
              {key}
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        <SnippetCopyButton
          value={commands[value as keyof typeof commands].code}
          onCopy={() => {
            toast.success('Copied to clipboard')
            track('copy_installer_code', {
              cli: value,
              package: packageName
            })
          }}
          onError={() => toast.error('Failed to copy to clipboard')}
        />
      </SnippetHeader>
      {Object.entries(commands).map(([key, command]) => (
        <SnippetTabsContent key={key} value={key}>
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  )
}
