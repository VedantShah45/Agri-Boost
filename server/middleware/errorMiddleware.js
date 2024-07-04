export const errorHandler=(err,req,res)=>{
    if(err){
        return res.status(401).send({
            success: false,
            message: "Some internal server error occured"
        });
    }
}