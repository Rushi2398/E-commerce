const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../../common/prisma/client');
const { z } = require('zod');

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email()
});

const register = async (req, res) => {
  try {
    const { username, password, email } = userSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, passwordHash, email }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
