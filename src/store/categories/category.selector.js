import { createSelector } from "reselect";
import { selectCurrentUser } from "../user/user.selector";

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer, selectCurrentUser],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const {title, items} = category
        acc[title.toLowerCase()] = items
        return acc;
    }, {})
)