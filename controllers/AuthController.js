const login = (req, res, next) =>{
    res.send('Hola soy login');
};


const register = (req, res, next) =>{
    res.send('Hola soy register');
};


const logout = (req, res, next) =>{
    res.send('Hola soy logout');
};



export { login, register, logout };