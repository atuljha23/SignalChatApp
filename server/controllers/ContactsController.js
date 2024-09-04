import User from "../models/UserModel.js";

export const searchContacts = async (req, res) => {
  try {
    const { search } = req.body;
    if (!search) {
      return res.status(400).json({ message: "Search term is required" });
    }
    const sanitizedSearchTerm = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(sanitizedSearchTerm, "i");
    console.log(searchRegex);
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [
            { firstName: searchRegex },
            { lastName: searchRegex },
            { email: searchRegex },
          ],
        },
      ],
    });
    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
