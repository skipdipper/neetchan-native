import { Children, useState } from "react";
import { Pressable, StyleSheet, View, Text, Modal } from "react-native";
import Option from "./Option";


type SelectProps<T> = {
    children: JSX.Element[];
    value: T;
    onChanged: (value: T) => void;
}

export default function Select({ children, value, onChanged }: SelectProps<any>) {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [currentValue, setCurrentvalue] = useState(value);

    const toggleSelected = () => {
        console.log('select pressed');
        setIsSelected(selected => !selected);
    }

    const handleChange = (value: any) => {
        if (currentValue === value) return;
        setCurrentvalue(value);
        onChanged?.(value);
    }


    // if (!isSelected) {
    //     return (
    //         <Pressable
    //             onPress={toggleSelected}
    //         >
    //             <Text>Bump</Text>
    //         </Pressable>
    //     );
    // }

    return (
        // <Modal
        //     transparent={true}
        //     visible={true}
        // >
        <View style={styles.selectContainer}>
            {Children.map(children, child => (
                <Pressable
                    android_ripple={{ color: '#dddddd' }}
                    onPress={() => {
                        handleChange(child.props.value);
                    }}
                >
                    {child}
                </Pressable>
            ))}
        </View>
        // </Modal>
    );
}

const styles = StyleSheet.create({
    selectContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});