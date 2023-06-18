import { Router } from 'express';
import argon2 from 'argon2';
import { AccountType } from '../enumTypes';
import { AccountLoginScheme, AccountRegistationScheme } from '../models/accountModels';
import auth from '../middleware/authMiddleware';
import client from '../repositories/client';
import { AccountRepository } from '../repositories';
import { handleErrorResp } from '../utils';

const authRouter = Router();


/**
 * This endpoint provides information about the currenct authentication.
 * If the user is authorized it returns the user entity. If there is 
 * invalid cookie or missing cookie, it return 401.
 */
authRouter.get('/', auth(), async (req, res) => {
    const id = req.session.account!.id;
    const result = await AccountRepository.getSingle({ id })

    if (result.isErr) {
        return handleErrorResp(res, result.error);
    }
    const account = result.value
    if (!account) {
        res.status(404).json({ message: 'Account does not exist!' });
        return;
    }

    res.json({ item: account, message: `User ${account.name} ${account.surename} is authorized` });
})


/**
 * It gets the user email, password and other user attributes and returns
 * register user in the application.
 */
authRouter.post('/registration', async (req, res) => {
    const r = await AccountRegistationScheme.safeParseAsync(req.body);
    if (!r.success) {
        res.status(400).json(r.error);
        return;
    }

    const { password, email, ...userData } = r.data;
    const hash = await argon2.hash(password);
    const result = await AccountRepository.createSingle({ email: email.toLowerCase(), ...userData, hashedPassword: hash })

    if (result.isErr) {
        return handleErrorResp(res, result.error);
    }

    const account = result.value

    res.json({ item: account, message: `User ${account.name} ${account.surename} was registered` });
})


/**
 * This endpoint after successful password verification add the user and
 * role to session stroge.
 */
authRouter.post('/login', async (req, res) => {
    const result = await AccountLoginScheme.safeParseAsync(req.body);
    if (!result.success) {
        res.status(400).json(result.error);
        return;
    }

    const { email, password } = result.data;
    const account = await client.account.findUnique({ where: { email: email.toLowerCase() } });

    if (!account) {
        return handleErrorResp(res, null, 404, 'User does not exists');
    }

    const isVerified = await argon2.verify(account.hashedPassword, password)

    if (!isVerified) {
        return handleErrorResp(res, null, 401, 'Wrong password');
    }

    req.session.account = { id: account.id, type: account.type as AccountType };
    res.json({ message: 'Logged in' });
})


/**
 * Remove the authorized user from session storage.
 */
authRouter.post('/logout', auth(), async (req, res) => {
    req.session.destroy(() => { });
    res.json({ message: 'Logged out' });
})

export default authRouter;