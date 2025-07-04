/*if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []; //only works for testing, need to use new database like mongo or smt
const resetCodes={}; 

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  // find  user
  const user = users.find(u => u.email === email)
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  // compare hashed password
  const iscor = await bcrypt.compare(password, user.password)
  if (!iscor) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful' });
});


app.post('/signup', async (req, res) => { //sign up page
  const { email, password } = req.body;

  try {
    const hashedpw = await bcrypt.hash(password, 12)

    
    users.push({ email, password: hashedpw });

    console.log('new user:', email, hashedpw)  //  check if working

    res.status(201).json({ message: 'signup ok' });  //  send token later

  } catch (err) {
    console.error('signup error:', err)
    res.status(500).json({ message: 'server error during signup' });
  }
});

app.delete('/delete-account', (req, res) => { // only temp for now, later use mongo or smt
  const { email } = req.body;
  const index = users.findIndex(u => u.email === email);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.json({ message: 'Account deleted' });
});

// store reset codes in memory , temp
//const resetCodes = {};

//send reset code temp
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    
    return res.json({ message: 'If your email is registered, a reset code has been sent.' });
  }
  //code 
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  resetCodes[email] = code;
  console.log(`Reset code for ${email}: ${code}`); // In real app, send via email
  res.json({ message: 'If your email is registered, a reset code has been sent.' });
});

// reset password
app.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || resetCodes[email] !== code) {
    return res.status(400).json({ message: 'Invalid email or reset code' });
  }
  user.password = await bcrypt.hash(newPassword, 12);
  delete resetCodes[email];
  res.json({ message: 'Password has been reset successfully' });
});


app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:5000');
}); */


const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const users = []; // store for testing/demo
const resetCodes = {}; // reset code store


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const iscor = await bcrypt.compare(password, user.password);
  if (!iscor) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ message: 'Login successful' });
});

// signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedpw = await bcrypt.hash(password, 12);
    users.push({ email, password: hashedpw });
    console.log('new user:', email, hashedpw);
    res.status(201).json({ message: 'signup ok' });
  } catch (err) {
    console.error('signup error:', err);
    res.status(500).json({ message: 'server error during signup' });
  }
});

// delete account endpoint (for testing)
app.delete('/delete-account', (req, res) => {
  const { email } = req.body;
  const index = users.findIndex(u => u.email === email);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.json({ message: 'Account deleted' });
});

// forgot password endpoint
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.json({ message: 'If your email is registered, a reset code has been sent.' });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  resetCodes[email] = code;
  console.log(`Reset code for ${email}: ${code}`); // In real app, send via email
  res.json({ message: 'If your email is registered, a reset code has been sent.' });
});

// reset password endpoint
app.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || resetCodes[email] !== code) {
    return res.status(400).json({ message: 'Invalid email or reset code' });
  }
  user.password = await bcrypt.hash(newPassword, 12);
  delete resetCodes[email];
  res.json({ message: 'Password has been reset successfully' });
});

// Start server
app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:5000');
});