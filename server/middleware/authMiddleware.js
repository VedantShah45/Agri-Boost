import jwt from 'jsonwebtoken'

const authenticationMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.send({
            msg:'No token provided'
        })
    }
    const token=authHeader.split(' ')[1]
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded);
        const {_id}=decoded
        req.headers.user_id=_id
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}

export default authenticationMiddleware