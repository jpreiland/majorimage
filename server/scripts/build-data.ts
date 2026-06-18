import fs from 'node:fs'
import Categories from '../data/words/categories.json'
import Groups from '../data/words/groups.json'
import Metals from '../data/materials/metals.json'
import Stones from '../data/materials/stones.json'
import Textiles from '../data/materials/textiles.json'
import Woods from '../data/materials/woods.json'

import type { CategoryName, GroupName } from '../../shared/types.ts'

type CategoriesData = Record<CategoryName, string[]>

const DATA_BASE_PATH = 'data'
const MODULES_BASE_PATH = DATA_BASE_PATH + '/modules'
const GENERATED_BASE_PATH = DATA_BASE_PATH + '/generated'

const GENERATED_CATEGORIES_PATH = GENERATED_BASE_PATH + '/categories.generated.json'
const GENERATED_GROUPS_PATH = GENERATED_BASE_PATH + '/groups.generated.json'
const GENERATED_STONES_PATH = GENERATED_BASE_PATH + '/stones.generated.json'
const GENERATED_METALS_PATH = GENERATED_BASE_PATH + '/metals.generated.json'
const GENERATED_TEXTILES_PATH = GENERATED_BASE_PATH + '/textiles.generated.json'
const GENERATED_WOODS_PATH = GENERATED_BASE_PATH + '/woods.generated.json'

const categories: CategoriesData = structuredClone(Categories)
const groups = structuredClone(Groups)
const metals = structuredClone(Metals)
const stones = structuredClone(Stones)
const textiles = structuredClone(Textiles)
const woods = structuredClone(Woods)

function buildData() {
  try {
    const modules = fs.readdirSync(MODULES_BASE_PATH, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()

    for (const moduleName of modules) {
      loadModule(moduleName)
    }

    writeGeneratedData()

  } catch (error) {
    console.error("Error loading data modules", error)
  }
}

function writeGeneratedData() {
  fs.writeFileSync(GENERATED_CATEGORIES_PATH, stringifyData(categories))
  fs.writeFileSync(GENERATED_GROUPS_PATH, stringifyData(groups))
  fs.writeFileSync(GENERATED_METALS_PATH, JSON.stringify(metals, null, 2))
  fs.writeFileSync(GENERATED_STONES_PATH, JSON.stringify(stones, null, 2))
  fs.writeFileSync(GENERATED_TEXTILES_PATH, JSON.stringify(textiles, null, 2))
  fs.writeFileSync(GENERATED_WOODS_PATH, JSON.stringify(woods, null, 2))
}

function loadModule(moduleName: string) {
  console.log(`loading module: ${moduleName}`)
  const modulePath = `${MODULES_BASE_PATH}/${moduleName}`
  const files = fs.readdirSync(modulePath)

  if (files.includes('categories-replace.json')) loadModuleReplacementCategories(`${modulePath}/categories-replace.json`)
  if (files.includes('categories.json')) loadModuleCategories(`${modulePath}/categories.json`)
  if (files.includes('categories-exclude.json')) loadModuleExclusionsCategories(`${modulePath}/categories-exclude.json`)

  if (files.includes('groups.json')) loadModuleGroups(`${modulePath}/groups.json`)

  if (files.includes('metals.json')) loadModuleMaterials(`${modulePath}/metals.json`, metals)
  if (files.includes('stones.json')) loadModuleMaterials(`${modulePath}/stones.json`, stones)
  if (files.includes('textiles.json')) loadModuleMaterials(`${modulePath}/textiles.json`, textiles)
  if (files.includes('woods.json')) loadModuleMaterials(`${modulePath}/woods.json`, woods)
}

function loadModuleCategories(path: string) {
  const rawData = fs.readFileSync(path, 'utf8')
  const moduleCategories = JSON.parse(rawData)

  for (const categoryName of Object.keys(moduleCategories) as CategoryName[]) {
    if (!(categoryName in categories)) {
      categories[categoryName] = moduleCategories[categoryName]
    } else {
      augmentCategory(categoryName, moduleCategories[categoryName])
    }
  }
}

function augmentCategory(categoryName: CategoryName, words: string[]) {
  const categoryWordSet = new Set(categories[categoryName])

  for (const word of words) {
    if (!categoryWordSet.has(word)) categories[categoryName].push(word)
  }
}

function loadModuleExclusionsCategories(path: string) {
  const rawData = fs.readFileSync(path, 'utf8')
  const moduleCategories = JSON.parse(rawData)

  for (const categoryName of Object.keys(moduleCategories) as CategoryName[]) {
    if (categoryName in categories) {
      removeWordsFromCategory(categoryName, moduleCategories[categoryName])
    }
  }  
}

function removeWordsFromCategory(categoryName: CategoryName, words: string[]) {
  const removeWordsSet = new Set(words)

  for (let i = categories[categoryName].length - 1; i >= 0; i--) {
    if (removeWordsSet.has(categories[categoryName][i])) categories[categoryName].splice(i, 1)
  }
}

function loadModuleReplacementCategories(path: string) {
  const rawData = fs.readFileSync(path, 'utf8')
  const moduleCategories = JSON.parse(rawData)

  for (const categoryName of Object.keys(moduleCategories) as CategoryName[]) {
    if (categoryName in categories) {
      categories[categoryName] = moduleCategories[categoryName]
    }
  }
}

function loadModuleGroups(path: string) {
  const rawData = fs.readFileSync(path, 'utf8')
  const moduleGroups = JSON.parse(rawData)

  for (const groupName of Object.keys(moduleGroups) as GroupName[]) {
    if (!(groupName in groups)) {
      groups[groupName] = moduleGroups[groupName]
    } else {
      augmentGroup(groupName, moduleGroups[groupName])
    }
  }
}

function augmentGroup(groupName: GroupName, groupMembers: string[]) {
  const groupMemberSet = new Set(groups[groupName])

  for (const groupMember of groupMembers) {
    if (!groupMemberSet.has(groupMember)) groups[groupName].push(groupMember)
  }
}

function loadModuleMaterials(path: string, baseMaterials: object) {
  const rawData = fs.readFileSync(path, 'utf8')
  const moduleMaterials = JSON.parse(rawData)

  if (Array.isArray(moduleMaterials) && Array.isArray(baseMaterials)) {
    baseMaterials.push(...moduleMaterials)
  }
}

function stringifyData(data: Record<string, string[]>) {
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