import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { table } from "./utils/airtable";

export default withApiAuthRequired(async (req, res) => {
  const { author, title } = req.body;
  const { user } = getSession(req, res);

  try {
    const createdRecords = await table.create([
      { fields: { author, title, userId: user.sub } }
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields
    };
    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
});
