import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: true });
    } else {
      return res.json({ newUser: true });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Signup failed" });
  }
};
