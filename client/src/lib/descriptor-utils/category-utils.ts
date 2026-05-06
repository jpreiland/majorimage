import { AppData, CategoryName } from "../../../../shared/types";

export function shuffleWordsInCategory(data: AppData, categoryName: CategoryName) {
  for (let i = data.categories[categoryName].length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data.categories[categoryName][i], data.categories[categoryName][j]] = [data.categories[categoryName][j], data.categories[categoryName][i]]
  }
}