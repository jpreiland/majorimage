export function validateAll(
  categories: Record<string, unknown>,
  groups: Record<string, unknown>,
  formats: Record<string, unknown>,
  descriptorFormatsMap: Record<string, unknown>
) {
  validateCategories(categories)
  validateGroups(categories, groups)
  validateFormats(categories, groups, formats, descriptorFormatsMap)
  validateDescriptorFormatsMap(formats, descriptorFormatsMap)
}

function validateCategories(categories: Record<string, unknown>) {
  for (const [category, wordList] of Object.entries(categories)) {
    if (!Array.isArray(wordList)) {
      throw new Error(`Category ${category} must be an array`)
    }
    const wordSet = new Set();

    for (const word of wordList) {
      if (typeof word !== 'string') {
        throw new Error(`Category ${category} contains non-string value: ${word}`)
      }

      if (wordSet.has(word)) {
        throw new Error(`Category ${category} contains duplicate word: ${word}`)
      } else {
        wordSet.add(word)
      }
    }
  }
}

function validateGroups(
  categories: Record<string, unknown>,
  groups: Record<string, unknown>
) {
  const categorySet = new Set(Object.keys(categories))

  for (const [groupName, groupList] of Object.entries(groups)) {
    if (!Array.isArray(groupList)) {
      throw new Error(`Group ${groupName} must be an array`)
    }

    for (const entry of groupList) {
      if (typeof entry !== 'string') {
        throw new Error(`Group ${groupName} contains non-string value: ${entry}`)
      }

      if (!categorySet.has(entry) && !groups[entry]) {
        throw new Error(`Group ${groupName} references unknown category/group: ${entry}`)
      }
    }
  }
}

function validateFormats(
  categories: Record<string, unknown>,
  groups: Record<string, unknown>,
  formats: Record<string, unknown>,
  dfMap: Record<string, unknown>
) {
  const categorySet = new Set(Object.keys(categories))
  const groupSet = new Set(Object.keys(groups))
  const groupsAndCategories = new Set([...categorySet, ...groupSet])
  const formatSet = new Set(Object.keys(formats))
  const dfNamesSet = new Set(Object.keys(dfMap))
  const dfNamesAndFormats = new Set([...formatSet, ...dfNamesSet])

  for (const [formatName, format] of Object.entries(formats)) {
    if (!Array.isArray(format)) {
      throw new Error(`Format ${formatName} must be an array`)
    }

    for (const instruction of format) {
      if (!Array.isArray(instruction)) {
        throw new Error(`Format ${formatName} has an invalid instruction: ${instruction}`)
      }

      validateFormatInstruction(instruction, formatName, groupsAndCategories, dfNamesAndFormats)
    }
  }
}

function validateFormatInstruction(
  params: unknown[],
  formatName: string,
  groupsAndCategories: Set<string>,
  dfNamesAndFormats: Set<string>
) {
  const instructionType = params[0]

  switch (instructionType) {
    case 'pick':
    case 'pick-pluralize':
    case 'pick-pluralize-optional':
    case 'pick-pastTense':
    case 'pick-verber':
    case 'pick-gerund':
      if (params.length !== 2) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number of params`)
      }
      if (typeof params[1] !== 'string') {
        throw new Error(`Format ${formatName} has ${instructionType} with invalid param: ${params[1]}`)
      }
      if (!groupsAndCategories.has(params[1])) {
        throw new Error(`Format ${formatName} has ${instructionType} that references unknown category/group: ${params[1]}`)
      }
      break

    case 'pick-multi':
      if (!new Set([4,5,6]).has(params.length)) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number of params`)
      }
      if (typeof params[1] !== 'string') {
        throw new Error(`Format ${formatName} has ${instructionType} instruction that references invalid category/group: ${params[1]}`)
      }
      if (!groupsAndCategories.has(params[1])) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction that references unknown category/group: ${params[1]}`)
      }
      if (typeof params[2] !== 'number' || 
          typeof params[3] !== 'number' ||
          params[3] <= params[2] ||
          (4 in params && !(
            typeof params[4] === 'number' &&
            params[4] >= 0.01 &&
            params[4] <= 0.99)) ||
          (5 in params && !(
            typeof params[5] === 'number' &&
            params[5] >= 0.01 &&
            params[5] <= 0.99))) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid params`)
      }
      break

    case 'static':
      if (params.length !== 2) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number of params`)
      }
      if (typeof params[1] !== 'string') {
        throw new Error(`Format ${formatName} static instruction must have a string`)
      }
      break

    case 'format':
      if (params.length !== 2) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number of params`)
      }
      if (typeof params[1] !== 'string' || !dfNamesAndFormats.has(params[1])) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction that references unknown format/df entry: ${params[1]}`)
      }
      break

    case 'number':
    case 'price':
      if (!new Set([3,4]).has(params.length)) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number of params`)
      }
      if (typeof params[1] !== 'number' || 
          typeof params[2] !== 'number' ||
          params[2] <= params[1]) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number range: ${params[1]}, ${params[2]}`)
      }
      if (3 in params && typeof params[3] !== 'string') {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid param: ${params[3]}`)
      }
      break

    case 'a(n)':
    case 'title':
      if (params.length !== 1) {
        throw new Error(`Format ${formatName} has ${instructionType} instruction with invalid number of params`)
      }
      break

    default:
      throw new Error(`Format ${formatName} has instruction with unknown instruction type: ${instructionType}`)
  }
}

function validateDescriptorFormatsMap(
  formats: Record<string, unknown>,
  dfMap: Record<string, unknown>
) {
  const formatSet = new Set(Object.keys(formats))

  for (const [dfEntryName, formatWeightPairs] of Object.entries(dfMap)) {
    if (!Array.isArray(formatWeightPairs)) {
      throw new Error(`DescriptorFormatsMap entry ${dfEntryName} must be array`)
    }

    for (const pair of formatWeightPairs) {
      if (!Array.isArray(pair) || pair.length !== 2) {
        throw new Error(`Invalid pair in DescriptorFormatsMap ${dfEntryName}`)
      }

      const [formatName, weight] = pair

      if (!formatSet.has(formatName)) {
        throw new Error(`DescriptorFormatsMap entry ${dfEntryName} references unknown format ${formatName}`)
      }

      if (typeof weight !== 'number' || weight < 1) {
        throw new Error(`Invalid weight for format ${formatName} in ${dfEntryName}`)
      }
    }
  }
}