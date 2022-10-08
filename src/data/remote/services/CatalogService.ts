import { catalogPostFromDto } from "../Mappers";
import { CatalogPageDto, CatalogPostDto } from "../dto/CatalogDto";
import { CatalogPost } from "../../../shared/types";

const controller = new AbortController();
const signal = controller.signal;

class CatalogService {
    async getCatalog(board: string) {
        const catalogUrl = (board: string) => `https://a.4cdn.org/${board}/catalog.json`;

        try {
            const response = await fetch(catalogUrl(board), { signal });

            if (!response.ok) {
                const error = new Error(response.statusText);
                return Promise.reject(error);
            }

            const json = await response.json();
            const threads: CatalogPostDto[] = json
                .map((page: CatalogPageDto) => page.threads)
                .flat();

            const catalogPosts: CatalogPost[] = threads.map(item => catalogPostFromDto(
                Object.defineProperty(item, "board", {
                    value: board,
                    writable: false,
                    configurable: true,
                    enumerable: true,
                }))
            );

            return catalogPosts;
            // return threads;

        } catch (error: any) {
            console.log(error);
            if (error.name === "AbortError") {
                console.log('Fetch request aborted');
            }
            return Promise.reject(error);
        }
    }
}

export default new CatalogService();