import { selector } from "recoil";
import { HouseResult } from "../components/types";
import { designsFilter, designsFilterData, fetchedDesigns } from "./atoms";

const filter = (design: HouseResult, filter: designsFilterData) => {
    if (filter.categoryType != "ALL" && filter.categoryType !== design.type) {
        return false;
    }

    if (filter.priceRange[0] < design.price || filter.priceRange[1] > design.price) {
        return false;
    }

    if (filter.name !== '' && !design.name.includes(filter.name)) {
        return false;
    }
    return true;
}

export const filteredDesigns = selector<Array<HouseResult>>({
    key: 'filteredDesigns',
    get: ({ get }) => {
        const filterData = get(designsFilter);
        const designs = get(fetchedDesigns);

        if (filterData.sortType !== "none") {
            const sorted = designs.sort((a, b) => filterData.sortType === "price-lh" ?
                a.price - b.price : b.price - a.price);
            return sorted.filter(design => filter(design, filterData))
        }

        return designs.filter(design => filter(design, filterData))
    }
})