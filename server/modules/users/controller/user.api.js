const userService = require('../services/user.service');
const authService = require('../../auth/services/auth.service');
const express = require('express');
const router = express.Router();

router.get('/writer', authService.restrict, async (req, res, next) => {
  try {
    let user = await userService.getUserById(req.session.userId);
    //console.log(user.list_post, user.list_post.length);
    res.render('writerPage/dashboard', { user: user });
  } catch (err) {
    next(err);
  }
});

router.get('/admin', authService.restrictAdmin, async (req, res, next) => {
  res.redirect('./admin/dashboard');
});

router.get('/admin/:tab', authService.restrictAdmin, async (req, res, next) => {
  try {
    res.render('./adminPages/dashboard', { tab: req.params.tab });
  } catch (err) {
    next(err);
  }
});

router.get('/', async function (req, res) {
  const users = await userService.getAllUser(req.query);
  res.send({ data: users });
});

router.post('/', async function (req, res, next) {
  try {
    let body = req.body;
    if (req.body.data) body = req.body.data[0];
    if (body.password != body.confirm_password) {
      req.session.error = 'Password and confirm password not match.';
      res.send({ error: req.session.error });
      return;
    }
    const user = await userService.createUser(body);
    if (!user) {
      req.session.error = 'Username/Email has already existed.';
      res.send({ error: req.session.error });
      return;
    }

    user.password = '';
    res.send({ data: [user] });
  } catch (err) {
    res.send({ error: 'Create user failed' });
  }
});

//TODO: Put Restrict
router.put(
  '/:userId',
  authService.restrictAdmin,
  async function (req, res, next) {
    try {
      let body = { ...req.body.data[req.params.userId] };
      const result = await userService.updateUserById(req.params.userId, body);
      res.send({ data: [await userService.getUserById(req.params.userId)] });
    } catch (err) {
      res.send({ err: 'Updating user failed! Please try again' });
    }
  }
);

router.put('/', authService.restrict, async function (req, res, next) {
  try {
    const result = await userService.updateUserById(
      req.session.userId,
      req.body
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/change-password',
  authService.restrict,
  async function (req, res, next) {
    try {
      const result = await userService.changePassword(
        req.session.userId,
        req.body.newPassword
      );
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/forget/reset-password', async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.email) {
      req.session.error = 'Please fill out all information.';
      res.redirect('auth/reset');
    }
    const result = await userService.resetPassword(
      req.body.username,
      req.body.email
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', authService.restrictAdmin, async function (req, res) {
  const result = await userService.deleteUser(req.params.userId);
  res.send(result);
});

module.exports = router;
