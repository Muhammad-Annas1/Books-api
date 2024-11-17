'use client';  // Add this line to indicate it's a client component

import { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;  // Add description field
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const handleEdit = (book: Book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentBook(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className=" flex items-center justify-center text-2xl font-bold mb-6">Books Collection</h1>
      
      <BookList books={books} onEdit={handleEdit} fetchBooks={fetchBooks} />
      <BookForm
        isEditing={isEditing}
        currentBook={currentBook}
        fetchBooks={fetchBooks}
      />
    </div>
  );
}
