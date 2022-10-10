import React, { useState } from "react";
import { ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";

type DropdownButtonProps = {
    items: any[] | undefined;
    value: any;
    onChanged?: (value: any) => void;
    menuItem?: ListRenderItem<any> | null;
}

export default function DropdownButton({ items, value, menuItem, onChanged }: DropdownButtonProps) {
    const [isDropdown, setIsDropdown] = useState<boolean>(false);
    const [currentValue, setCurrentvalue] = useState(value);


    const toggleDropdown = () => {
        setIsDropdown(prev => !prev);
    }

    const handleChange = (value: any) => {
        // TODO: Same-value equality using Object.is
        if (currentValue === value) return;
        setCurrentvalue(value);
        onChanged?.(value);
    }


    return (
        <>
            {/* Currently Selected MenuItem */}
            <Pressable
                onPress={toggleDropdown}
                android_ripple={{ color: '#dddddd' }}
                pointerEvents='box-only'
            >
                <View
                    style={styles.currentMenuItem}
                >
                    <DropdownMenuItem
                        // TODO: remove hardcoded props
                        value={currentValue.board}
                        child={<Text>{`/${currentValue.board}/ - ${currentValue.title}`}</Text>}
                    />
                    <Icon name='arrow-drop-down' size={24} color='#333' />
                </View>
            </Pressable>

            {/* List of all MenuItems */}
            <DropdownMenu
                data={items}
                menuItem={menuItem}
                visible={isDropdown}
                onClose={toggleDropdown}
                setValue={handleChange}
            />
        </>
    );
}

const styles = StyleSheet.create({
    currentMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});