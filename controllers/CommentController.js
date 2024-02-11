import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { error } from "../utils/errorHandler.js";

//store/save new comment
const store = async(req,res,next)=>{

    const { content} = req.body;
    const {_id:userId} = req.user;
    const {postId} = req.params;


    if (!content  || !postId, !userId) {
        return next(error(404, 'All fields are required'))
    }


    try {

        const findPost = await Post.findById(postId);

        if (!findPost) {
            return next(error(404, 'Post Not Found'));
        }
        

        const newComment =  new Comment({content, userId, postId});


        const response = await newComment.save();

        


        res.json({
            success:true,
            data:response,
            status:204
        });

        
    } catch (error) {
        next(error)
    }
};


export {store};