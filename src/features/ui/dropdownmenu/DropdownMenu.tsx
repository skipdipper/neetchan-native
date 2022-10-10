import React from "react";
import { Animated, FlatList, ListRenderItem, ListRenderItemInfo, Modal, StyleSheet, View } from "react-native";
import DropdownMenuItem from "./DropdownMenuItem";


type DropdownMenuProps = {
    data: any[] | undefined;
    visible?: boolean;
    menuItem?: ListRenderItem<any> | null;
    setValue?: (value: any) => void;
    onClose?: () => void;
}

export default function DropdownMenu({ data, visible, menuItem, onClose, setValue }: DropdownMenuProps) {

    const handleBackdrop = () => {
        onClose?.();
    };

    const handlePress = (value: any) => {
        console.log('Pressed on MenuItem', value.board);
        setValue?.(value);
        onClose?.();
    }

    const renderItem = (listItem: ListRenderItemInfo<any>) => {
        const item = menuItem?.(listItem);

        return (
            <DropdownMenuItem
                value={listItem.item}
                child={item}
                onPress={handlePress}
            />
        );
    }


    return (
        <>
            <Modal transparent={true} visible={visible}>
                <Animated.View
                    style={styles.backdrop}
                    onTouchEnd={handleBackdrop}
                >
                </Animated.View>

                <View style={styles.container}>
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        data={data}
                        // keyExtractor={keyExtractor}
                        renderItem={renderItem}
                    />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});