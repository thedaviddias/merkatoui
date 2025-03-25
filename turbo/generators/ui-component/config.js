/**
 * UI Component Generator Configuration
 * This generator creates new UI components in the components/ directory
 */
export default function generator(plop) {
  plop.setGenerator('ui-component', {
    description: 'Create a new UI component package',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of the component?',
        validate: value => {
          if (!value.trim()) {
            return 'Component name is required'
          }
          if (!/^[A-Z][A-Za-z0-9]+$/.test(value)) {
            return 'Component name must be in PascalCase (e.g., Button, Dialog, Card)'
          }
          return true
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a brief description of the component:',
        validate: value => (value.trim() ? true : 'Description is required')
      },
      {
        type: 'confirm',
        name: 'hasIcon',
        message: 'Does this component use icons?',
        default: false
      }
    ],
    actions: data => {
      // Convert componentName to packageName (lowercase)
      data.packageName = data.componentName.toLowerCase()

      return [
        {
          type: 'add',
          path: 'components/{{packageName}}/package.json',
          templateFile: 'templates/package.json.hbs'
        },
        {
          type: 'add',
          path: 'components/{{packageName}}/tsconfig.json',
          templateFile: 'templates/tsconfig.json.hbs'
        },
        {
          type: 'add',
          path: 'components/{{packageName}}/index.tsx',
          templateFile: 'templates/index.tsx.hbs'
        }
      ]
    }
  })
}
