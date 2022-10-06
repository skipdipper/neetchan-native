import { Board } from "../../shared/types";
import BoardDao from "../local/dao/BoardDao";
import BoardService from "../remote/services/BoardService";
import CatalogService from "../remote/services/CatalogService";
import ThreadService from "../remote/services/ThreadService";
import IRepository from "./IRepository";

class Repository implements IRepository<any>{
    async getCatalog(board: string) {
        const catalog = await CatalogService.getCatalog(board);
        return catalog;
    }

    async getThread(board: string, threadId: number) {
        const thread = await ThreadService.getThread(board, threadId);
        return thread;
    }

    async getBoardList(): Promise<Board[]> {
        const localBoards = BoardDao.getAllBoards();
        if (localBoards && localBoards.length > 0) {
            return localBoards;
        } else {
            const boards = await BoardService.getBoard();
            BoardDao.initBoards(boards);
            return boards;
        }
    }
}

export default new Repository();