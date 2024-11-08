export const verifyEmail = async (req, res) => {
  const { email } = req.body;

  console.log(req.body, "req.body");
  try {
    const emails = ["test@mail.com", "dontsul.v@gmail.com", "vgoatd@gmail.com"];

    if (!email) {
      throw new Error("email not found");
    }
    const isVerified = emails.includes(email) ? true : false;

    console.log(isVerified, "isVerified result");
    return res.json({ isVerified });
  } catch (error) {
    console.log("error");
  }
};
