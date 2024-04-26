const editUserController = async(req, res, next)=> {
    try {
        res.send('Pasó bien el middleware!');
    } catch(error) {
        next(error);
    }
};

export default editUserController;