import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";

type DropdownButtonProps = {
    items: any[] | undefined;
    value: any;
    onChanged?: (value: any) => void;
    menuItem?: (item: any) => React.ReactElement | null;
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

    const currentItem = menuItem?.({ item: currentValue });


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
                        value={null}
                        child={currentItem}
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