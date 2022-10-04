import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";
import { IconProps } from "react-native-vector-icons/Icon";
import IconButton from "./IconButton";

interface BackButtonProps extends Partial<IconProps> {
    onPress?: () => void;
};

export default function BackButton({ onPress, ...icon }: BackButtonProps) {
    const navigation = useNavigation();

    const handleNavigateBack = () => {
        if (navigation.canGoBack()) {
            onPress?.();
            navigation.goBack();
        }
    }

    // TODO: handle onLongPress add vibration and tooltip
    return (
        <IconButton
            name={Platform.OS === 'android' ? 'arrow-back' : 'arrow-back-ios'}
            {...icon}
            onPress={handleNavigateBack}
        />
    );
}