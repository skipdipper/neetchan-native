import { CatalogPost } from "../../../shared/types";
import { CatalogPageDto } from "../dto/CatalogDto";
import HttpClient from "../HttpClient";
import { catalogPostFromDto } from "../Mappers";

class CatalogService {
    async getCatalog(board: string) {
        const catalogUrl = (board: string) => `https://a.4cdn.org/${board}/catalog.json`;

        const client = new HttpClient();
        const json = await client.get<CatalogPageDto[]>(catalogUrl(board));

        const threads = json
            .map((page) => page.threads)
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
    }
}

export default new CatalogService();