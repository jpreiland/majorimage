import fs from 'node:fs'
import Categories from '../data/words/categories.json'
import Groups from '../data/words/groups.json'
import Metals from '../data/materials/metals.json'
import Stones from '../data/materials/stones.json'
import Textiles from '../data/materials/textiles.json'
import Woods from '../data/materials/woods.json'

import type { CategoryName, GroupName } from '../../shared/types.ts'

const DATA_BASE_PATH = 'data'
const MODULES_BASE_PATH = DATA_BASE_PATH + '/modules'
const GENERATED_BASE_PATH = DATA_BASE_PATH + '/generated'

const GENERATED_CATEGORIES_PATH = GENERATED_BASE_PATH + '/categories.generated.json'
const GENERATED_GROUPS_PATH = GENERATED_BASE_PATH + '/groups.generated.json'
const GENERATED_STONES_PATH = GENERATED_BASE_PATH + '/stones.generated.json'
const GENERATED_METALS_PATH = GENERATED_BASE_PATH + '/metals.generated.json'
const GENERATED_TEXTILES_PATH = GENERATED_BASE_PATH + '/textiles.generated.json'
const GENERATED_WOODS_PATH = GENERATED_BASE_PATH + '/woods.generated.json'

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
    const categoriesString = stringifyData(Categories)
    fs.writeFileSync(GENERATED_CATEGORIES_PATH, categoriesString)
  }

  if (files.includes('categories-exclude.json')) {
    loadModuleExclusionsCategories(`${modulePath}/categories-exclude.json`)
    const categoriesString = stringifyData(Categories)
    fs.writeFileSync(GENERATED_CATEGORIES_PATH, categoriesString)
  }

  if (files.includes('categories-replace.json')) {
    loadModuleReplacementCategories(`${modulePath}/categories-replace.json`)
    const categoriesString = stringifyData(Categories)
    fs.writeFileSync(GENERATED_CATEGORIES_PATH, categoriesString)
  }

  if (files.includes('groups.json')) {
    loadModuleGroups(`${modulePath}/groups.json`)
    const groupsString = stringifyData(Groups)
    fs.writeFileSync(GENERATED_GROUPS_PATH, groupsString)
  }

  if (files.includes('metals.json')) {
    loadModuleMaterials(`${modulePath}/metals.json`, Metals)
    const metalsString = JSON.stringify(Metals, null, 2)
    fs.writeFileSync(GENERATED_METALS_PATH, metalsString)
  }

  if (files.includes('stones.json')) {
    loadModuleMaterials(`${modulePath}/stones.json`, Stones)
    const stonesString = JSON.stringify(Stones, null, 2)
    fs.writeFileSync(GENERATED_STONES_PATH, stonesString)
  }

  if (files.includes('textiles.json')) {
    loadModuleMaterials(`${modulePath}/textiles.json`, Textiles)
    const textilesString = JSON.stringify(Textiles, null, 2)
    fs.writeFileSync(GENERATED_TEXTILES_PATH, textilesString)
  }

  if (files.includes('woods.json')) {
    loadModuleMaterials(`${modulePath}/woods.json`, Woods)
    const woodsString = JSON.stringify(Woods, null, 2)
    fs.writeFileSync(GENERATED_WOODS_PATH, woodsString)
  }
}

function loadModuleCategories(path: string) {
  if (fs.statSync(path).isFile()) {
    const rawData = fs.readFileSync(path, 'utf8')
    const moduleCategories = JSON.parse(rawData)

    for (const categoryName of Object.keys(moduleCategories) as CategoryName[]) {
      if (!Object.keys(Categories).includes(categoryName)) {
        Categories[categoryName] = moduleCategories[categoryName]
      } else {
        augmentCategory(categoryName, moduleCategories[categoryName])
      }
    }
  }
}

function augmentCategory(categoryName: CategoryName, words: string[]) {
  for (const word of words) {
    // @ts-expect-error
    if (!Categories[categoryName].includes(word)) Categories[categoryName].push(word)
  }
}

function loadModuleExclusionsCategories(path: string) {
  if (fs.statSync(path).isFile()) {
    const rawData = fs.readFileSync(path, 'utf8')
    const moduleCategories = JSON.parse(rawData)

    for (const categoryName of Object.keys(moduleCategories) as CategoryName[]) {
      if (Object.keys(Categories).includes(categoryName)) {
        removeWordsFromCategory(categoryName, moduleCategories[categoryName])
      }
    }
  }
}

function removeWordsFromCategory(categoryName: CategoryName, words: string[]) {
  const removeWordsSet = new Set(words)

  for (let i = Categories[categoryName].length - 1; i >= 0; i--) {
    if (removeWordsSet.has(Categories[categoryName][i])) Categories[categoryName].splice(i, 1)
  }
}

function loadModuleReplacementCategories(path: string) {
  if (fs.statSync(path).isFile()) {
    const rawData = fs.readFileSync(path, 'utf8')
    const moduleCategories = JSON.parse(rawData)

    for (const categoryName of Object.keys(moduleCategories) as CategoryName[]) {
      if (Object.keys(Categories).includes(categoryName)) {
        Categories[categoryName] = moduleCategories[categoryName]
      }
    }
  }
}

function loadModuleGroups(path: string) {
  if (fs.statSync(path).isFile()) {
    const rawData = fs.readFileSync(path, 'utf8')
    const moduleGroups = JSON.parse(rawData)

    for (const groupName of Object.keys(moduleGroups) as GroupName[]) {
      if (!Object.keys(Groups).includes(groupName)) {
        Groups[groupName] = moduleGroups[groupName]
      } else {
        augmentGroup(groupName, moduleGroups[groupName])
      }
    }
  }
}

function augmentGroup(groupName: GroupName, groupMembers: string[]) {
  for (const groupMember of groupMembers) {
    if (!Groups[groupName].includes(groupMember)) Groups[groupName].push(groupMember)
  }
}

function loadModuleMaterials(path: string, baseMaterials: object) {
  if (fs.statSync(path).isFile()) {
    const rawData = fs.readFileSync(path, 'utf8')
    const moduleMaterials = JSON.parse(rawData)

    if (Array.isArray(moduleMaterials) && Array.isArray(baseMaterials)) {
      baseMaterials.push(...moduleMaterials)
    }
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