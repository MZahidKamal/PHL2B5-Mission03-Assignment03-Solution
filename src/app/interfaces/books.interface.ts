// Creating interface for the book model.
interface BookInterface {
    title: string,
    author: string,
    genre: string,
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}





interface BookInstanceMethodInterface {
    correctIsbnPattern: (originalIsbn: string) => Promise<string>
    checkAndUpdateAvailability: () => Promise<void>
}





export {
    BookInterface,
    BookInstanceMethodInterface
};
