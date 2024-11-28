export const verifyEmail = async (req, res) => {
  const origin = req.headers.origin;
  const originDomain = req.headers.host;
  const { email } = req.body;

  console.log(req.body, "req.body data");

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

export const isMFAEnabled = async (req, res) => {
  const { tenant, env } = req.body;

  console.log(tenant, "tenant");
  console.log(env, "env");

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
