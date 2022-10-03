interface IRepository<T> {
    getCatalog(board: string): Promise<T>;
    getThread(board: string, threadId: number): Promise<T>;
}