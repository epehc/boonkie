import React from "react"

interface Book {
    id: string;
    title: string;
    subtitle: string;
    isbn: string;
    abstract: string;
    author: string;
    publisher: string;
    price: string;
    numPages: number;
    cover: string;
    userId: number;
    like: boolean;
}

export default Book;