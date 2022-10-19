import { CatalogPost } from "../../shared/types";
import Option from "../ui/select/Option";
import Select from "../ui/select/Select";
import { CatalogContextInterface, useCatalogContext } from "./CatalogContext";

export default function CatalogSortByMenu() {
    const { data, setData } = useCatalogContext() as CatalogContextInterface;

    const handleChange = (value: any) => {
        console.log('Catalog SortBy', value);
        const sorted = sortBy(data, value);
        setData(sorted);
    }

    const sortBy = (catalog: CatalogPost[], sortBy: string, order: 'asc' | 'dsc' = 'dsc'): CatalogPost[] => {
        // Index bump order
        const array = catalog.map((item, index) => ({ ...item, ...(item.index === undefined && { index }) }));

        const sortByBump = () => array.sort((a, b) => a.index! - b.index!);
        const sortByReplyCount = () => array.sort((a, b) => b.replies - a.replies);
        const sortByImageCount = () => array.sort((a, b) => b.images - a.images);
        const sortByNewest = () => array.sort((a, b) => b.time - a.time);
        const sortByOldest = () => array.sort((a, b) => a.time - b.time);
        const sortByLastReply = () => array.sort((a, b) => b.lastModified - a.lastModified);

        const sortFns = {
            get bump() { return sortByBump() },
            get reply() { return sortByReplyCount() },
            get image() { return sortByImageCount() },
            get newest() { return sortByNewest() },
            get oldest() { return sortByOldest() },
            get lastReply() { return sortByLastReply() },
        }

        if (!sortFns.hasOwnProperty(sortBy)) {
            console.log('sortBy key not found');
            return catalog;
        }

        return sortFns[sortBy as keyof typeof sortFns];
    }

    // TODO: retrieve previous sortBy order from mmkv
    return (
        <Select
            value='bump'
            onChanged={handleChange}
        >
            <Option value='bump'>Bump order</Option>
            <Option value='reply'>Reply count</Option>
            <Option value='image'>Image count</Option>
            <Option value='newest'>Newest</Option>
            <Option value='oldest'>Oldest</Option>
            <Option value='lastReply'>Latest reply</Option>
        </Select>
    );
}