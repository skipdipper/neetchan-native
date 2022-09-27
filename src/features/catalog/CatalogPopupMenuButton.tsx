import React from "react";
import { StyleSheet, Text } from "react-native";
import { useScrollControllerContext, ScrollControllerContextInterface } from "../gallery/ScrollControllerContext";
import { PopupMenuButton, PopupMenuItem } from "../ui/popupmenu";

export default function CatalogPopupMenuButton() {
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;

    const scrollToTop = () => {
        scrollRef.current?.scrollToIndex({ animated: false, index: 10, viewPosition: 0 });
    }

    const scrollToBottom = () => {
        // TODO: scroll to last index instead
        scrollRef.current?.scrollToEnd({ animated: false });
    }

    const icon = <Text style={styles.icon}>{"\u22EE"}</Text>;


    return (
        <PopupMenuButton
            icon={icon}
            popupMenuEntry={[
                <PopupMenuItem child='sort' />,
                <PopupMenuItem child='archive' />,
                <PopupMenuItem child='open in a browser' />,
                <PopupMenuItem child='share' />,
                <PopupMenuItem child='top' action={scrollToTop} />,
                <PopupMenuItem child='bottom' action={scrollToBottom} />,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 12,
    }
});