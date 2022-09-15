import { Text, View } from 'react-native';
import { parseDocument, ElementType } from 'htmlparser2';
import React from 'react';
import { CrossLink, DeadLink, Quote, QuoteLink, ThreadLink, WebLink, SpoilerText } from './render-element';


type RenderHtmlProps = {
    html: string,
};

/*
Adapted from: https://meliorence.github.io/react-native-render-html/docs/reinvent-the-wheel
*/
export default function RenderHtml({ html }: RenderHtmlProps) {
    const ignoredTags = ['head', 'wbr'];
    const textTags = ['span', 'strong', 'em', 's'];

    const renderTextNode: React.FC = (textNode: any, index: number) => {
        if (textNode.data.includes('http')) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const parts = textNode.data.split(urlRegex);
            return (
                // TODO: Fix nested Text overflowing
                <Text key={index} selectable={true} selectionColor='orange' style={{ textAlignVertical: 'top' }}>
                    {
                        parts.map((part: string, index: number) => (part.match(urlRegex)
                            ? <WebLink key={index} url={part} />
                            : part
                        ))
                    }
                </Text>
            )
        }

        return (
            <Text key={index} selectable={true} selectionColor='orange'>
                {textNode.data}
            </Text>
        );
    }

    const renderElement: React.FC = (element: any, index: number) => {
        if (ignoredTags.includes(element.name)) return null;

        if (element.name == 'br') {
            return (
                <Text key={index}>{"\n"}</Text>
            );
        }

        if (element.name == 'a' && element.attribs?.class == 'quotelink') {
            if (element.attribs?.href.includes('/thread')) {
                return (
                    <ThreadLink key={index} href={element.attribs.href}>
                        {element.children.map((c: any, i: number) => renderNode(c, i))}
                    </ThreadLink>
                );
            }

            if (element.attribs?.href.includes('//boards.4channel.org') ||
                element.attribs?.href.includes('//boards.4chan.org')) {
                return (
                    <CrossLink key={index} href={element.attribs.href}>
                        {element.children.map((c: any, i: number) => renderNode(c, i))}
                    </CrossLink>
                );
            }

            return (
                <QuoteLink key={index} href={element.attribs.href}>
                    {element.children.map((c: any, i: number) => renderNode(c, i))}
                </QuoteLink>
            );
        }

        if (element.name == 'span') {
            if (element.attribs?.class == 'quote') {
                return (
                    <Quote key={index}>
                        {element.children.map((c: any, i: number) => renderNode(c, i))}
                    </Quote>
                );
            }

            if (element.attribs?.class == 'deadlink') {
                return (
                    <DeadLink key={index}>
                        {element.children.map((c: any, i: number) => renderNode(c, i))}
                    </DeadLink>
                );
            }
        }

        if (element.name == 's') {
            return (
                <SpoilerText key={index}>
                    {element.children.map((c: any, i: number) => renderNode(c, i))}
                </SpoilerText>
            )
        }

        return (
            <Text key={index}>
                {element.children.map((c: any, i: number) => renderNode(c, i))}
            </Text>
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


    const document = parseDocument(html.replace('<wbr>', ''));
    return (
        <Text>{document.children.map((c, i) => renderNode(c, i))}</Text>
    );
}