import Book from '../Models/Book.js';

export const GetAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error in GetAllBooks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const CreateBook = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBook = new Book({ title, content });
    await newBook.save();
    res.status(201).json({message: "Book Created Successfully", book: newBook});
  } catch (error) {
    console.error("Error in CreateBook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateBook = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res
    .status(201)
    .json({ message: `Book Put request working for id: ${id}`, body: body });
};

export const DeleteBook = (req, res) => {
  const { id } = req.params;
  res
    .status(201)
    .json({ message: `Book Delete request working for id: ${id}` });
};
