import { getQuoteIds } from "../../../lib/getQuoteIds";
import { ThreadDto } from "../dto/ThreadDto";
import HttpClient from "../HttpClient";
import { threadPostFromDto } from "../Mappers";

class ThreadService {
    async getThread(board: string, threadId: number) {
        const threadUrl = (board: string, threadId: number) => `https://a.4cdn.org/${board}/thread/${threadId}.json`;

        const client = new HttpClient();
        const json = await client.get<ThreadDto>(threadUrl(board, threadId));
        // throw the error from HTTP get

        const thread = new Map<number, any>(
            json.posts.map(post => {
                return [
                    post.no,
                    threadPostFromDto(
                        Object.defineProperty(post, "board", {
                            value: board,
                            writable: false,
                            configurable: true,
                            enumerable: true,
                        })
                    )
                ]
            })
        );

        // Populate Post Reply Ids for each post
        json.posts.forEach(post => {
            const comment = post.com;
            if (!comment) return;

            const postIds = getQuoteIds(comment);
            postIds.forEach(postId => {
                if (!thread.has(postId)) return;

                // TODO: encapsulate logic in postReplies setter
                // thread.get(postId).postReplies = post.no;
                if (thread.get(postId).postReplies) {
                    thread.get(postId).postReplies.add(post.no);
                } else {
                    thread.get(postId).postReplies = new Set([post.no]);
                }
            });
        });

        return thread;
    }
}

export default new ThreadService();