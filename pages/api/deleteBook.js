import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { deleteBook, getBookById } from "../../utils/Fauna";

export default withApiAuthRequired(async function handler(req, res) {
  const { id } = req.body;
  const session = getSession(req, res);
  const userId = session.user.sub;

  if (req.method !== "DELETE") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const existingRecord = await getBookById(id);

  if (!existingRecord || existingRecord.data.userId !== userId) {
    res.statusCode = 404;
    return res.json({ msg: "Record not found" });
  }

  try {
    const deletedBook = await deleteBook(id);
    return res.status(200).json(deletedBook);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});
