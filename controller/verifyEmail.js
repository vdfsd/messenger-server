export const verifyEmail = async (req, res) => {
  const origin = req.headers.origin;

  const { email } = req.body;

  try {
    const emails = ["test@mail.com", "test2@mail.com"];

    if (!email) {
      throw new Error("email not found");
    }

    const isVerified = emails.includes(email);

    return res.json({ isVerified });
  } catch (error) {
    console.log("error");
  }
};

export const isMFAEnabled = async (req, res) => {
  const { tenant, env } = req.body;

  try {
    if (!tenant) {
      throw new Error("email not found");
    }

    const isPhoneMfaEnabled = true;
    const isEmailMfaEnabled = true;
    const isMfaChoiceAvailable = isPhoneMfaEnabled && isEmailMfaEnabled;

    return res.json({
      isPhoneMfaEnabled,
      isEmailMfaEnabled,
      isMfaChoiceAvailable,
    });
  } catch (error) {
    console.log("error");
  }
};
