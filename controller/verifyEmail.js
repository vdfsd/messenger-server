export const verifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log("get data request");
  console.log(email, "email data");
  console.log(req.body, "req.body");
  try {
    const emails = ["test@mail.com"];

    if (!email) {
      throw new Error("email not found");
    }
    return res.json({ isVerified: emails.includes(email) ? true : false });
  } catch (error) {
    console.log("error");
  }
};
