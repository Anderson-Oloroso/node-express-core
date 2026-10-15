const autorizarUsuario = (req, res, next) => {
    const auth = req.signedCookies?.auth;
    if(!auth){
        return res.status(401).json({ error: 'Usuario no autorizado' });
    }

    req.authUserId = auth;
    next();
};

export default autorizarUsuario;