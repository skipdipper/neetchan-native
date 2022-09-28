import React from "react";
import { useScrollControllerContext, ScrollControllerContextInterface } from "../gallery/ScrollControllerContext";
import { PopupMenuButton, PopupMenuItem } from "../ui/popupmenu";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function CatalogPopupMenuButton() {
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;

    const scrollToTop = () => {
        scrollRef.current?.scrollToIndex({ animated: false, index: 0, viewPosition: 0 });
    }

    const scrollToBottom = () => {
        // TODO: scroll to last index instead
        scrollRef.current?.scrollToEnd({ animated: false });
    }

    const icon = <Icon name="more-vert" size={30} color="#333" />;


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