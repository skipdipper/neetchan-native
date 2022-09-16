import { Parser } from 'htmlparser2';

/*
Parses html string and returns empty array or array of Post Ids
*/
export function getQuoteIds(html: string): Array<number> {
    const postIds: Array<number> = [];
    const parser = new Parser({
        onopentag(name, attributes) {
            if (name === "a" && attributes.class === "quotelink" && attributes.href?.startsWith('#p')) {
                const postId = parseInt(attributes.href.slice(2));
                postIds.push(postId);
            }
        },
    });
    parser.write(html);
    parser.end();

    return postIds;
}