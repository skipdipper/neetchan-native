import CatalogService from "../remote/services/CatalogService";
import ThreadService from "../remote/services/ThreadService";

class Repository implements IRepository<any>{
    async getCatalog(board: string) {
        const catalog = await CatalogService.getCatalog(board);
        return catalog;
    }

    async getThread(board: string, threadId: number) {
        const thread = await ThreadService.getThread(board, threadId);
        return thread;
    }
}

export default new Repository();