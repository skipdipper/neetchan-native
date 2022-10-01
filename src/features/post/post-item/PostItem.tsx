import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Comment, FileDetails, PostDetails, Replies, Subject, Thumbnail } from '.';
import { Spacer } from '../../ui';


type PostItemProps = {
    item: any,
    catalog: boolean,
};

export default function PostItem({ item, catalog = false }: PostItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.thumbnailContainer}>
                {item?.tim &&
                    <Thumbnail
                        tim={item.tim}
                        filename={item.filename}
                        extension={item.ext}
                        catalog={catalog}
                    />
                }
            </View>

            <View
                style={styles.textContent}
                pointerEvents={catalog ? 'none' : 'auto'}
            >
                {item?.sub && <Subject subject={item.sub} />}

                <PostDetails
                    name={item.name}
                    postID={item.no}
                    now={item.now}
                    time={item.time}
                />

                {item?.tim &&
                    <FileDetails
                        filename={item.filename}
                        extension={item.ext}
                        fileSize={item.fsize}
                        width={item.w}
                        height={item.h}
                    />
                }

                {item?.com &&
                    <Comment comment={item?.com} catalog={catalog} />
                }

                {/* Alternative to Wrapping Replies inside a View 
                with flex: 1, justifyContent: 'flex-end' */}
                <Spacer />

                {item?.postReplies &&
                    <Replies replies={item.postReplies} />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // flex: 1,
        paddingVertical: 4,
    },
    thumbnailContainer: {
        marginRight: 8,
    },
    textContent: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        // marginLeft: 8
    }
});