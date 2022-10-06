import { Board } from "../../../shared/types";
import KVstore from "../KVstore";

class BoardDao {
    private boardKey = 'board.all';

    getAllBoards(): Board[] | undefined {
        const boards = KVstore.retrieveDataObject(this.boardKey);
        return boards;
    }

    initBoards(boards: object) {
        KVstore.storeDataObject(boards, this.boardKey);
    }
}

export default new BoardDao();