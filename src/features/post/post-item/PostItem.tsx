import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Comment, FileDetails, PostDetails, Replies, Subject, Thumbnail } from '.';
import { Spacer } from '../../ui';


type PostItemProps = {
    item: any; // OriginalPost & ReplyPost,
    catalog: boolean,
};

export default function PostItem({ item, catalog = false }: PostItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.thumbnailContainer}>
                {item?.tim &&
                    <Thumbnail
                        uri={item.thumbnailUrl!}
                        tim={item.tim}
                        filename={item.filename!}
                        fileExtension={item.fileExtension!}
                        catalog={catalog}
                    />
                }
            </View>

            <View
                style={styles.textContent}
                pointerEvents={catalog ? 'none' : 'auto'}
            >
                {item?.subject && <Subject subject={item.subject} />}

                <PostDetails
                    name={item.name}
                    postID={item.postId}
                    time={item.time}
                />

                {item?.tim &&
                    <FileDetails
                        filename={item.filename!}
                        fileExtension={item.fileExtension!}
                        fileSize={item.filesize!}
                        width={item.width!}
                        height={item.height!}
                    />
                }

                {item?.comment &&
                    <Comment comment={item.comment} catalog={catalog} />
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