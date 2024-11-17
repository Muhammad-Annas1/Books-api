import { NextResponse } from 'next/server';

let books = [
  { id: 1, title: 'The Merchant of Venice', 
    author: 'William Shakespeare', 
    description: 'The story of a merchant, Antonio, and a Jewish moneylender, Shylock, who make a dangerous agreement over a loan. The play explores themes of justice, mercy, friendship, and love. It also shows how greed and revenge can lead to serious consequences.' 
  },

  { id: 2, title: 'Treasure Island', 
    author: 'Robert Louis Stevenson', 
    description: 'The story about a young boy, Jim Hawkins, who finds a treasure map. He embarks on a dangerous journey with his friends and some pirates to find the treasure. Along the way, Jim faces challenges of trust, betrayal, and survival.'
   },

  { id: 3, title: 'Harry Potter', 
    author: 'J.K. Rowling', 
    description: 'A series of novels about a young wizard, Harry Potter, who attends Hogwarts School of Witchcraft and Wizardry. Along with his friends Ron and Hermione, Harry faces magical adventures and battles the dark wizard, Lord Voldemort, who killed his parents. The series explores themes of friendship, love, truth, and the struggle between good and evil.' 
  },

  { id: 4, title: 'To Kill a Mockingbird', 
    author: 'Harper Lee', 
    description: 'Set in the 1930s in a small town in Alabama, the story is told through the eyes of Scout Finch, a young girl. Her father, Atticus Finch, is a lawyer who defends a black man, Tom Robinson, falsely accused of raping a white woman. The novel addresses important themes like racism, justice, and moral growth, as Scout and her brother, Jem, learn about the complexities of human nature and society.' 
  },

  { id: 5, title: 'Cell', 
    author: 'Stephen King', 
    description: 'The story begins with a mysterious event called "The Pulse," where a signal transmitted through mobile phones turns people into violent, zombie-like creatures. The protagonist, Clay Riddell, is a graphic novelist who survives the initial outbreak and teams up with other survivors. As they try to navigate through the chaos and destruction, they must confront the terrifying effects of the Pulse and the threat of being overtaken by the infected.' 
  },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const { title, author, description } = await req.json(); // added description
  const newBook = { id: Date.now(), title, author, description }; // added description
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, title, author, description } = await req.json(); // added description
  books = books.map(book =>
    book.id === id ? { ...book, title, author, description } : book // added description
  );
  return NextResponse.json({ id, title, author, description }); // added description
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  books = books.filter(book => book.id !== id);
  return NextResponse.json({ message: 'Book deleted successfully' });
}
