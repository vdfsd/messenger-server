export const verifyEmail = async (req, res) => {
  const origin = req.headers.origin;
  const { email } = req.body;

  try {
    const emails = ["test@mail.com", "dontsul.v@gmail.com", "vgoatd@gmail.com"];

    if (!email) {
      throw new Error("email not found");
    }

    const isVerified = emails.includes(email) ? true : false;

    console.log(origin, "origin data");
    // console.log(isVerified, "isVerified result");
    return res.json({ isVerified });
  } catch (error) {
    console.log("error");
  }
};
