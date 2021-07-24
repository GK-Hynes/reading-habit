import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getBooks } from "../../utils/Fauna";

export default async function (req, res) {
  if (req.method !== "GET") {
    return res.status(405);
  }
  try {
    const books = await getBooks();
    return res.status(200).json(books);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
}
