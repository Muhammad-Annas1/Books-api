import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface BookFormProps {
  isEditing: boolean;
  currentBook: Book | null;
  fetchBooks: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ isEditing, currentBook, fetchBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEditing && currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setDescription(currentBook.description);
    }
  }, [isEditing, currentBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = { title, author, description };

    if (isEditing && currentBook) {
      await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBook, id: currentBook.id }),
      });
    } else {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
    }

    fetchBooks();
    setTitle('');
    setAuthor('');
    setDescription('');
  };

  return (
    
    <form  onSubmit={handleSubmit} className="space-y-4 ">
      <h1 className='pt-4 font-bold text-2xl'>Add Your Book or Edit</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      ></textarea>
      <div className="flex justify-start">
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
       
      </div>
      <h1 className='flex items-center justify-center '> &copy; 2024|Build With❤️By Muhammad Annas</h1>
    </form>
  );
};

export default BookForm;
