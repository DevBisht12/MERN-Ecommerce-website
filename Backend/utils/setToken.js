export const sendToken = (user, statusCode, res,token) => {

    // Options for cookies 

    console.log(user)
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };    
    
    res.cookie('token', token, options);
    res.status(statusCode).json({
        success: true,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        token: token,
        message: `Welcome ${user.name}!`
    })
}   


