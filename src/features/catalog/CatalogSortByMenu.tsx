import { useState, useTransition } from "react";
import { StyleSheet, View } from "react-native";
import { CatalogPost } from "../../shared/types";
import { ModalVisibilityContextInterface, useModalVisibility } from "../ui/modal/ModalVisibilityContext";
import RadioListTile from "../ui/select/RadioListTile";
import { CatalogContextInterface, useCatalogContext } from "./CatalogContext";

const Sort = {
    BUMP: 'bump',
    REPLY_COUNT: 'reply',
    IMAGE_COUNT: 'image',
    NEWEST: 'newest',
    OLDEST: 'oldest',
    LAST_REPLY: 'lastReply'
} as const;

export default function CatalogSortByMenu() {
    const [isPending, startTransition] = useTransition();
    const { data, setData } = useCatalogContext() as CatalogContextInterface;
    const [checked, setChecked] = useState(Sort.BUMP);

    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;

    const handleChange = (value: any) => {
        console.log('Catalog SortBy', value);
        // Urgent update Radio Icon checked status
        setChecked(value);
        // TODO: Fix transition not deferring
        // Enable new architecture required for React 18 concurrent features  
        modalRef.current.closeModal();
        // Transition update, alternative to flushSync
        startTransition(() => {
            const sorted = sortBy(data, value);
            setData(sorted);
        });
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
            console.error('sortBy key not found');
            return catalog;
        }

        return sortFns[sortBy as keyof typeof sortFns];
    }

    // TODO: retrieve previous sortBy order from mmkv
    return (
        <View style={styles.container}>
            <RadioListTile title="Bump order" value={Sort.BUMP} groupValue={checked} onChanged={handleChange} />
            <RadioListTile title="Reply count" value={Sort.REPLY_COUNT} groupValue={checked} onChanged={handleChange} />
            <RadioListTile title="Image count" value={Sort.IMAGE_COUNT} groupValue={checked} onChanged={handleChange} />
            <RadioListTile title="Newest" value={Sort.NEWEST} groupValue={checked} onChanged={handleChange} />
            <RadioListTile title="Oldest" value={Sort.OLDEST} groupValue={checked} onChanged={handleChange} />
            <RadioListTile title="Latest reply" value={Sort.LAST_REPLY} groupValue={checked} onChanged={handleChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    }
});