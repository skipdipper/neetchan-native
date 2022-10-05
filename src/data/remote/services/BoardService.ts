import { boardFromDto } from "../Mappers";
import { BoardArrayDto } from "../dto/BoardsDto";

const controller = new AbortController();
const signal = controller.signal;

class BoardService {
    async getBoard() {
        const boardUrl = () => `https://a.4cdn.org/boards.json`;

        try {
            const response = await fetch(boardUrl(), { signal });

            if (!response.ok) {
                const error = new Error(response.statusText);
                return Promise.reject(error);
            }

            const json: BoardArrayDto = await response.json();
            const boards = json.boards.map(board => boardFromDto(board));

            return boards;

        } catch (error: any) {
            console.log(error);
            if (error.name === "AbortError") {
                console.log('Fetch request aborted');
            }
            return Promise.reject(error);
        }
    }
}

export default new BoardService();