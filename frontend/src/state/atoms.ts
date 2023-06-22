import { atom } from "recoil"
import { CategoryType, HouseResult } from "../components/types"

export interface designsFilterData {
    sortType: "none" | "price-lh" | "price-hl",
    categoryType: CategoryType | 'ALL',
    priceRange: [number, number],
    name: string;
}

const defaultDesignsFilter: designsFilterData = {
    sortType: "none",
    categoryType: "ALL",
    priceRange: [0, 1000000],
    name: "",
}

export const designsFilter = atom<designsFilterData>({
    key: 'designsFilter',
    default: defaultDesignsFilter
})

export const fetchedDesigns = atom<Array<HouseResult>>({
    key: 'fetchedDesigns',
    default: [],
})