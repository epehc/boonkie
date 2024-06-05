
import NewBook from "./NewBook";

interface Book extends NewBook {
    id: string;
    isbn: string;
    userId: number;
}

export default Book;