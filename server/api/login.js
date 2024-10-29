// api/login.js
import { loginUser } from '../controllers/user.controller.js';

export default async (req, res) => {
  if (req.method === 'POST') {
    return loginUser(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
