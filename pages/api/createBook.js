import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { createBook } from "../../utils/Fauna";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const { author, title } = req.body;
  const completed = false;

  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    const createdBook = await createBook(author, title, completed, userId);
    return res.status(200).json(createdBook);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});
