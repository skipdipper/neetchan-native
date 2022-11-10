import { useRoute } from "@react-navigation/native";
import React from "react";
import { Alert, Share } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollControllerContextInterface, useScrollControllerContext } from "../gallery/ScrollControllerContext";
import { PopupMenuButton, PopupMenuItem } from "../ui/popupmenu";


export default function ThreadPopupMenuButton() {
    const { scrollRef } = useScrollControllerContext() as ScrollControllerContextInterface;
    const route = useRoute<any>();


    const scrollToTop = () => {
        scrollRef.current?.scrollToIndex({ animated: false, index: 0, viewPosition: 0 });
    }

    const scrollToBottom = () => {
        // TODO: scroll to last index instead
        scrollRef.current?.scrollToEnd({ animated: false });
    }

    const share = async () => {
        const { board, threadId } = route.params;

        const message = `https://boards.4chan.org/${board}/thread/${threadId}`;
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

    const icon = <Icon name="more-vert" size={24} color="#fff" />;


    return (
        <PopupMenuButton
            icon={icon}
            popupMenuEntry={[
                <PopupMenuItem child='search' />,
                <PopupMenuItem child='reload' />,
                <PopupMenuItem child='archive' />,
                <PopupMenuItem child='open in a browser' />,
                <PopupMenuItem child='share' action={share} />,
                <PopupMenuItem child='top' action={scrollToTop} />,
                <PopupMenuItem child='bottom' action={scrollToBottom} />,
            ]}
        />
    );
}