/**
 * Build Registry Script
 *
 * This script generates registry files for UI components that follow the shadcn UI format.
 * It scans a directory of UI packages, extracts metadata and file contents,
 * and writes registry JSON files to a specified output directory.
 */
import { promises as fs } from 'node:fs'
import { readdirSync } from 'node:fs'
import path, { join } from 'node:path'

// Configuration (can be moved to env vars or config file)
type Config = {
  packagesDir: string
  outputDir: string
  internalPackages: string[]
  excludedDependencies: {
    dependencies: string[]
    devDependencies: string[]
  }
  registryAuthor: string
  homepageBaseUrl: string
}

const config: Config = {
  packagesDir: 'components',
  outputDir: 'apps/web/public/r',
  internalPackages: ['shadcn-ui', '@merkatoui/config-typescript'],
  excludedDependencies: {
    dependencies: ['react', 'react-dom', '@merkatoui/shadcn-ui'],
    devDependencies: [
      '@merkatoui/config-typescript',
      '@types/react',
      '@types/react-dom',
      'typescript'
    ]
  },
  registryAuthor: 'David Dias <hello@thedaviddias.com>',
  homepageBaseUrl: 'https://merkatoui.com'
}

// Types
type PackageFile = {
  type: string
  path: string
  content: string
  target: string
}

type RegistryData = {
  $schema: string
  homepage: string
  name: string
  type: string
  author: string
  registryDependencies: string[]
  dependencies: string[]
  devDependencies: string[]
  files: PackageFile[]
}

/**
 * Recursively creates directories if they don't exist and writes data to a file
 *
 * @param filePath - Path to write the file to
 * @param data - String data to write
 */
const writeFileRecursive = async (filePath: string, data: string): Promise<void> => {
  try {
    const dir = path.dirname(filePath)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(filePath, data, 'utf-8')
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error)
    throw error
  }
}

/**
 * Gets a list of package directories, excluding internal packages
 *
 * @param basePath - Base path to scan for packages
 * @param excludePackages - List of package names to exclude
 * @returns Array of package names
 */
const getPackageDirectories = (basePath: string, excludePackages: string[]): string[] => {
  try {
    const cwd = process.cwd()
    const fullPath = join(cwd, basePath)
    const dirs = readdirSync(fullPath, { withFileTypes: true })

    return dirs
      .filter(dir => dir.isDirectory() && !excludePackages.includes(dir.name))
      .map(dir => dir.name)
  } catch (error) {
    console.error('Error reading package directories:', error)
    return []
  }
}

/**
 * Reads and parses a package.json file
 *
 * @param packagePath - Path to the package.json file
 * @returns Parsed package.json content
 */
const readPackageJson = async (packagePath: string): Promise<any> => {
  try {
    const content = await fs.readFile(packagePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error reading package.json at ${packagePath}:`, error)
    throw error
  }
}

/**
 * Reads component files from a package directory
 *
 * @param packageDir - Path to the package directory
 * @param pkg - Package name
 * @returns Array of package files with content
 */
const readComponentFiles = async (packageDir: string, pkg: string): Promise<PackageFile[]> => {
  try {
    const fileEntries = readdirSync(packageDir, { withFileTypes: true }).filter(
      file => file.isFile() && file.name.endsWith('.tsx')
    )

    const files = await Promise.all(
      fileEntries.map(async file => {
        const filePath = join(packageDir, file.name)
        const content = await fs.readFile(filePath, 'utf-8')
        return {
          type: 'registry:ui',
          path: file.name,
          content,
          target: `components/ui/merkatoui/${pkg}/${file.name}`
        }
      })
    )

    return files
  } catch (error) {
    console.error(`Error reading component files for ${pkg}:`, error)
    return []
  }
}

/**
 * Extract component dependencies from file content
 *
 * @param content - Combined content of all component files
 * @returns Array of dependency names
 */
const extractRegistryDependencies = (content: string): string[] => {
  const matches = content.match(/@\/components\/ui\/([a-z-]+)/g) || []
  return matches.map(path => path.split('/').pop()).filter((name): name is string => !!name)
}

/**
 * Builds a registry file for a single package
 *
 * @param pkg - Package name
 * @param config - Configuration options
 */
const buildRegistry = async (pkg: string, config: Config): Promise<void> => {
  try {
    const cwd = process.cwd()
    const packageDir = join(cwd, config.packagesDir, pkg)

    // Read package.json
    const packageJsonPath = join(packageDir, 'package.json')
    const packageJson = await readPackageJson(packageJsonPath)

    // Extract dependencies
    const dependencies = Object.keys(packageJson.dependencies || {}).filter(
      dep => !config.excludedDependencies.dependencies.includes(dep)
    )

    const devDependencies = Object.keys(packageJson.devDependencies || {}).filter(
      dep => !config.excludedDependencies.devDependencies.includes(dep)
    )

    // Read component files
    const files = await readComponentFiles(packageDir, pkg)
    const allContent = files.map(f => f.content).join('\n')

    // Extract registry dependencies
    const registryDependencies = extractRegistryDependencies(allContent)

    // Create registry data
    const registryData: RegistryData = {
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      homepage: `${config.homepageBaseUrl}/docs/components/${pkg}`,
      name: pkg,
      type: 'registry:ui',
      author: config.registryAuthor,
      registryDependencies,
      dependencies,
      devDependencies,
      files
    }

    // Write registry file
    const jsonPath = join(cwd, config.outputDir, `${pkg}.json`)
    await writeFileRecursive(jsonPath, JSON.stringify(registryData, null, 2))
    console.log(`✅ Generated registry for ${pkg}`)
  } catch (error) {
    console.error(`❌ Failed to build registry for ${pkg}:`, error)
  }
}

/**
 * Main function to build all registry files
 */
const main = async (): Promise<void> => {
  try {
    const packages = getPackageDirectories(config.packagesDir, config.internalPackages)

    if (packages.length === 0) {
      console.warn('⚠️  No packages found to process')
      return
    }

    console.log(`🔍 Found ${packages.length} packages to process...`)

    for (const pkg of packages) {
      await buildRegistry(pkg, config)
    }

    console.log('✨ Registry build completed successfully')
  } catch (error) {
    console.error('❌ Registry build failed:', error)
    process.exit(1)
  }
}

// Run the script
main()
