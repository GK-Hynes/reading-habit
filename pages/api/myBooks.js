import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getBooksByUser } from "../../utils/Fauna";

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const session = getSession(req, res);
  const userId = session.user.sub;

  try {
    const books = await getBooksByUser(userId);
    return res.status(200).json(books);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});
