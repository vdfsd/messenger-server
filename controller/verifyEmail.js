export const verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const emails = ["test@mail.com"];

    if (!email) {
      throw new Error("email not found");
    }
    return { isVerified: emails.includes(email) ? true : false };
  } catch (error) {
    console.log("error");
  }
};
