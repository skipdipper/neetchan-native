import React from 'react';
import { StyleSheet, View, ViewStyle } from "react-native";

type AppBarProps = {
    leading?: React.ReactNode;
    title?: React.ReactNode;
    titleStyle?: ViewStyle;
    actions?: React.ReactNode[];
    bottom?: React.ReactNode;
};

export default function AppBar({ leading, title, titleStyle, actions, bottom }: AppBarProps) {

    return (
        <View style={styles.appbar}>
            <View style={styles.toolbar}>
                <View style={styles.leading}>
                    {leading}
                </View>

                <View style={[styles.title, titleStyle]}>
                    {title}
                </View>

                <View style={styles.actions}>
                    {actions?.map((action, index) => (
                        <View key={index} style={{
                            marginLeft: index && 24
                        }}>
                            {action}
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.bottom}>
                {bottom}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 16,
        backgroundColor: 'orange'
    },
    toolbar: {
        height: 56, // landscape: 48
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
    },
    leading: {
        // backgroundColor: 'purple'
    },
    title: {
        flex: 1,
        marginLeft: 32,
        // backgroundColor: 'blue'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    bottom: {
        maxHeight: 32,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    }
});