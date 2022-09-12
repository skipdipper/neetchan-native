import { Text, View } from 'react-native';
import { parseDocument, ElementType } from 'htmlparser2';
import React from 'react';


type RenderHtmlProps = {
    html: string,
};

// Adapted from: https://meliorence.github.io/react-native-render-html/docs/reinvent-the-wheel
export default function RenderHtml({ html }: RenderHtmlProps) {
    const ignoredTags = ['head', 'wbr'];
    const textTags = ['span', 'strong', 'em'];

    const renderTextNode: React.FC = (textNode: any, index: number) => {
        return (
            <Text key={index} selectable={true} selectionColor='orange'>
                {textNode.data}
            </Text>
        );
    }

    const renderElement: React.FC = (element: any, index: number) => {
        if (ignoredTags.includes(element.name)) return null;

        const Wrapper: typeof React.Component = textTags.includes(element.name) ? Text : View;

        return (
            <Wrapper key={index}>
                {element.children.map((c: any, i: number) => renderNode(c, i))}
            </Wrapper>
        );

    }

    const renderNode: React.FC = (node: any, index: number) => {
        switch (node.type) {
            case ElementType.Text:
                return renderTextNode(node, index);
            case ElementType.Tag:
                return renderElement(node, index);
        }
        return null;
    }


    const document = parseDocument(html);
    return (
        <>{document.children.map((c, i) => renderNode(c, i))}</>
    );
}