import {getUser} from '../src/services/user';

const ControllerHandler = (promise, param) => async (req, res, next) => {
    const boundParams = params ? params[req, res, next] : [];
    try {
        const result = await promise(...boundParams);
        return res.json(result || {message: 'OK'})
    } catch(e) {
        return rs.status(500) && next(e);
    }
}

const c = ControllerHandler;

router.get('/user/:username', c(getUser, (req, res, next) => [req.params.username] ))
