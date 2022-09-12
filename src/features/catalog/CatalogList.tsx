import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PostItem } from '../post';
import Separator from '../ui/Separator';


const catalogUrl = (board: string) => `https://a.4cdn.org/${board}/catalog.json`;

type CatalogListProps = {
    board: string,
};

export default function CatalogList({ board }: CatalogListProps) {
    const navigation = useNavigation<any>();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCatalog();
        setRefreshing(false);

    }, []);

    const getCatalog = async () => {
        try {
            const response = await fetch(catalogUrl(board));
            const json = await response.json();
            setData(json[0].threads);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCatalog();
    }, []);


    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={(item: any) => item.no}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item }) => (
                        <Pressable android_ripple={{ color: '#dddddd' }} onPress={() => {
                            console.log(`Pressed on thread ${item.no}`);
                            navigation.navigate('Thread', { no: item.no });
                        }
                        }>
                            <PostItem item={item} catalog={true} />

                            <View style={{ flexDirection: 'row' }}>
                                <Text>{item.replies} replies, </Text>
                                <Text>{item.images} images</Text>
                            </View>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={Separator}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 4,
    },
})

