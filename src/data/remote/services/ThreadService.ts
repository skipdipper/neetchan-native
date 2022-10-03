import { getQuoteIds } from "../../../lib/getQuoteIds";
import { ThreadDto } from "../dto/ThreadDto";
import { threadPostFromDto } from "../Mappers";

const controller = new AbortController();
const signal = controller.signal;

class ThreadService {
    async getThread(board: string, threadId: number) {
        const threadUrl = (board: string, threadId: number) => `https://a.4cdn.org/${board}/thread/${threadId}.json`;

        try {
            const response = await fetch(threadUrl(board, threadId), { signal });

            if (!response.ok) {
                const error = new Error(response.statusText);
                return Promise.reject(error);
            }

            const json: ThreadDto = await response.json();

            const thread = new Map<number, any>(
                json.posts.map(post => {
                    //  TODO: add prop replies: Set<postId>
                    return [post.no, { ...post }];
                    // TODO: map dto to domain object
                    // return [post.no, threadPostFromDto(post)];
                })
            );

            // Populate Post Reply Ids for each post
            json.posts.forEach(post => {
                const comment = post.com;
                if (!comment) return;

                const postIds = getQuoteIds(comment);
                postIds.forEach(postId => {
                    if (!thread.has(postId)) return;

                    if (thread.get(postId).postReplies) {
                        thread.get(postId).postReplies.add(post.no);
                    } else {
                        thread.get(postId).postReplies = new Set([post.no]);
                    }
                });
            });

            return thread;

        } catch (error: any) {
            console.log(error);
            if (error.name === "AbortError") {
                console.log('Fetch request aborted');
            }
            return Promise.reject(error);
        }
    }
}

export default new ThreadService();