const faunadb = require("faunadb");
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

function convertRefToId(book) {
  book.id = book.ref.id;
  delete book.ref;
  return book;
}

async function getBooks() {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("books"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const books = data.map((book) => convertRefToId(book));
  return books;
}

async function getBookById(id) {
  const book = await faunaClient.query(q.Get(q.Ref(q.Collection("books"), id)));
  convertRefToId(book);
}

async function getBooksByUser(userId) {
  const { data } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index("books_by_user"), userId)),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const books = data.map((book) => convertRefToId(book));
  return books;
}

async function createBook(author, title, completed, userId) {
  return await faunaClient.query(
    q.Create(q.Collection("books"), {
      data: { author, title, completed, userId }
    })
  );
}

async function updateBook(id, author, title, completed) {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection("books"), id), {
      data: { author, title, completed }
    })
  );
}

async function deleteBook(id) {
  return await faunaClient.query(q.Delete(q.Ref(q.Collection("books"), id)));
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByUser
};
