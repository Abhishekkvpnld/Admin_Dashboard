

export const adminAuth = async(req,res,next)=>{
    try {
        const adminToken = "" 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error:true,
            message:"Authentication Error...🔐"
        })
    }
}