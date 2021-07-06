import { getSession } from "@auth0/nextjs-auth0";
import { table, getMinifiedRecord } from "./utils/airtable";
import ownsRecord from "./middleware/ownsRecord";

export default ownsRecord(async (req, res) => {
  const { id } = req.body;
  const { user } = getSession(req, res);

  try {
    const deletedRecords = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deletedRecords[0]));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});
