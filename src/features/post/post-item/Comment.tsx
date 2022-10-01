import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import RenderHtml from '../../../lib/RenderHtml';


type CommentProps = {
    comment: string,
    catalog: boolean,
};

export default function Comment({ comment, catalog }: CommentProps) {

    if (catalog) {
        return (
            <Text numberOfLines={10} ellipsizeMode='tail'>
                <RenderHtml html={comment} />
            </Text>
        );
    }

    return (
        <RenderHtml html={comment} />
    );
}
