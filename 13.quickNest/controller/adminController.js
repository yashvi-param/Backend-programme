import User from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";

const updateUserData = async(req ,res ,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new HttpError("user not found",404));
        }
        const updates = Object.keys(req.body);

        const allowedUpdate = ["name","password","phone"];

        const isValid = updates.every((field)=>allowedUpdate.includes(field));

        if(!isValid){
            return next(new HttpError("only allowed field can be updated",404));
        }
        updates.forEach((update)=>{
            user[update] = req.body[update];
        });
        await user.save();
        res.status(200).json({success:true,message:"user data updated successfully",user});

    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

const deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return next(new HttpError("user not found",404));
        }
        res.status(200).json({success:true,message:"user deleted successfully!"});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

export default {updateUserData,deleteUser};