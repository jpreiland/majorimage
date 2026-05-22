import fs from 'node:fs'
import Categories from '../data/words/categories.json'

import { CategoryName } from '../../shared/types.ts'

const DATA_BASE_PATH = 'data'
const MODULES_BASE_PATH = DATA_BASE_PATH + '/modules'
const GENERATED_BASE_PATH = DATA_BASE_PATH + '/generated'

const GENERATED_CATEGORIES_PATH = GENERATED_BASE_PATH + '/categories.generated.json'

function buildData() {
  try {
    const modules = fs.readdirSync(MODULES_BASE_PATH, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)

    for (const moduleName of modules) {
      loadModule(moduleName)
    }
  } catch (error) {
    console.error("Error loading data modules", error)
  }
}

function loadModule(moduleName: string) {
  console.log(`loading module: ${moduleName}`)
  const modulePath = `${MODULES_BASE_PATH}/${moduleName}`
  const files = fs.readdirSync(modulePath)

  if (files.includes('categories.json')) {
    loadModuleCategories(`${modulePath}/categories.json`)
    // alphabetize
    const categoriesString = stringifyCategories(Categories)
    fs.writeFileSync(GENERATED_CATEGORIES_PATH, categoriesString)
  }
}

function loadModuleCategories(path: string) {
  if (fs.statSync(path).isFile()) {
    const rawData = fs.readFileSync(path, 'utf8')
    const moduleCategories = JSON.parse(rawData)

    for (const categoryName of Object.keys(moduleCategories)) {
      if (!Object.keys(Categories).includes(categoryName)) {
        Categories[categoryName] = moduleCategories[categoryName]
      } else {
        augmentCategory(categoryName as CategoryName, moduleCategories[categoryName])
      }
    }
  }
}

function augmentCategory(categoryName: CategoryName, words: string[]) {
  for (const word of words) {
    if (!Categories[categoryName].includes(word)) Categories[categoryName].push(word)
  }
}

function stringifyCategories(data: Record<string, string[]>) {
  const lines = ['{']

  const entries = Object.entries(data).sort(([a], [b]) =>  a.localeCompare(b))

  entries.forEach(([key, value], index) => {
    const sortedValues = [...value].sort((a, b) => a.localeCompare(b))
    const arrayString = `[${sortedValues.map(v => JSON.stringify(v)).join(', ')}]`

    const comma = index < entries.length - 1 ? ',' : ''

    lines.push(`  ${JSON.stringify(key)}: ${arrayString}${comma}`)
  })

  lines.push('}')

  return lines.join('\n')
}

buildData()