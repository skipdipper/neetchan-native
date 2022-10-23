import { BoardArrayDto } from "../dto/BoardsDto";
import HttpClient from "../HttpClient";
import { boardFromDto } from "../Mappers";

class BoardService {
    async getBoard() {
        const boardUrl = 'https://a.4cdn.org/boards.json';

        const client = new HttpClient();
        const json = await client.get<BoardArrayDto>(boardUrl);

        const boards = json.boards.map(board => boardFromDto(board));

        return boards;
    }
}

export default new BoardService();