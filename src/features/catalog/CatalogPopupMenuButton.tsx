import React, { useCallback } from "react";
import { Alert, Linking, Share } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollControllerContextInterface, useScrollControllerContext } from "../gallery/ScrollControllerContext";
import { ModalVisibilityContextInterface, useModalVisibility } from "../ui/modal/ModalVisibilityContext";
import { PopupMenuButton, PopupMenuItem } from "../ui/popupmenu";
import CatalogSortByMenu from "./CatalogSortByMenu";

type CatalogPopupMenuButtonProps = {
    board: string;
}

export default function CatalogPopupMenuButton({ board }: CatalogPopupMenuButtonProps) {
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;
    const { modalRef } = useModalVisibility() as ModalVisibilityContextInterface;

    const scrollToTop = () => {
        scrollRef.current?.scrollToIndex({ animated: false, index: 0, viewPosition: 0 });
    }

    const scrollToBottom = () => {
        // TODO: scroll to last index instead
        scrollRef.current?.scrollToEnd({ animated: false });
    }

    const share = async () => {
        const message = `https://boards.4channel.org/${board}`;
        const dialogTitle = 'share';

        try {
            const result = await Share.share({ message }, { dialogTitle });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // TODO: handle IOS share
                } else {
                    // TODO: handle android share
                }
            } else if (result.action === Share.dismissedAction) {
                // TODO: handle dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }

    const openBrowser = useCallback(async () => {
        const url = `https://boards.4channel.org/${board}`;

        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [board]);

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
                <PopupMenuItem child='open in a browser' action={openBrowser} />,
                <PopupMenuItem child='share' action={share} />,
                <PopupMenuItem child='top' action={scrollToTop} />,
                <PopupMenuItem child='bottom' action={scrollToBottom} />,
            ]}
        />
    );
}