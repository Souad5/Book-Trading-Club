export const GetAllBooks = (req, res) => {
  res.status(200).json({ message: 'Book Get Request Working' });
};

export const CreateBook = (req, res) => {
  const body = req.body;
  res.status(201).json({ message: 'Book Post request working', body });
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
