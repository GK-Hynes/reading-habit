import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { updateBook, getBookById } from "../../utils/Fauna";

export default withApiAuthRequired(async function handler(req, res) {
  const { id } = req.body;
  const { author, title, completed } = req.body.data;
  const session = getSession(req, res);
  const userId = session.user.sub;

  if (req.method !== "PUT") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const existingRecord = await getBookById(id);

  if (!existingRecord || existingRecord.data.userId !== userId) {
    res.statusCode = 404;
    return res.json({ msg: "Record not found" });
  }

  try {
    const updatedBook = await updateBook(id, author, title, completed);
    return res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
