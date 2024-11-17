interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
  }
  
  interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    fetchBooks: () => void;
  }
  
  const BookList: React.FC<BookListProps> = ({ books, onEdit, fetchBooks }) => {
    const handleDelete = async (id: number) => {
      await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      // Reload the page to reflect the changes
      window.location.reload();
    };
  
    return (
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex flex-col justify-between items-start p-4 bg-gray-100 rounded shadow"
          >
            <div className="text-lg font-semibold">
              {book.title} by {book.author}
            </div>
            <p className="text-sm text-gray-600 mt-2">{book.description}</p>
            <div className="mt-4">
              <button
                onClick={() => onEdit(book)}
                className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
  
            </div>
            
            
          </li>
        ))}
      </ul>
     
    );
  };
  
  export default BookList;
  