import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollControllerContextInterface, useScrollControllerContext } from "../gallery/ScrollControllerContext";
import { ModalVisibilityContextInterface, useModalVisibility } from "../ui/modal/ModalVisibilityContext";
import { PopupMenuButton, PopupMenuItem } from "../ui/popupmenu";
import CatalogSortByMenu from "./CatalogSortByMenu";


export default function CatalogPopupMenuButton() {
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;

    const scrollToTop = () => {
        scrollRef.current?.scrollToIndex({ animated: false, index: 0, viewPosition: 0 });
    }

    const scrollToBottom = () => {
        // TODO: scroll to last index instead
        scrollRef.current?.scrollToEnd({ animated: false });
    }

    const icon = <Icon name="more-vert" size={24} color="#333" />;

    const showCatalogSortByMenu = () => {
        modalRef.current.registerChild(<CatalogSortByMenu />);
        modalRef.current.openModal();
    }

    return (
        <PopupMenuButton
            icon={icon}
            popupMenuEntry={[
                <PopupMenuItem child='sort' action={showCatalogSortByMenu} />,
                <PopupMenuItem child='archive' />,
                <PopupMenuItem child='open in a browser' />,
                <PopupMenuItem child='share' />,
                <PopupMenuItem child='top' action={scrollToTop} />,
                <PopupMenuItem child='bottom' action={scrollToBottom} />,
            ]}
        />
    );
}