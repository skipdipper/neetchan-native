import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { AppStatusBar } from '../features/ui';
import Thread from '../features/thread/Thread';


type ThreadScreenProps = {
    navigation: any,
    route: any,
};

export default function ThreadScreen({ navigation, route }: ThreadScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <AppStatusBar />
            <Thread board={'a'} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})
