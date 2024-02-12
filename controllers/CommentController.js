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

const indexPostComments = async ( req, res, next) => {
    const {postId} = req.params;

    try {

        const findPost = await Post.findById(postId);


        if (!findPost) {
            return next(error(404, 'Post Not Found'));
        }


        const postComments = await Comment.find({postId}).sort({createdAt: -1});


        res.json({
            success:true,
            data:postComments,
            status:200
        });

    } catch (error) {
        next(error)
    }

}


const likeOrUnlike = async ( req, res, next ) => {

    const {commentId} = req.params;
    const {_id:userId} = req.user;

    try {

        
        //verify if comment exists
        const findComment =  await Comment.findById(commentId);
        if (!findComment) {
            return next(error(404, 'Post Not Found'));
        }
        
        
        const { numberLikes, likes } = findComment._doc;


        let action;
        
        const isLiked = likes.some(like => like === userId.toString());


        if (isLiked) {

            const newLikes = likes.filter(like => like !== userId.toString())
            findComment.likes = newLikes;
            findComment.numberLikes = numberLikes > 0 ? numberLikes - 1 : 0;
            action = false;

            
        }else{
            findComment.likes = [...likes, userId.toString() ]
            findComment.numberLikes = numberLikes + 1;
            action = true;
        }


        const request = await findComment.save();


        res.json({
            success:true,
            data:{
                comment:request,
                like:action
            },

            status:200
        });
        
    } catch (error) {
        next(error);
    }

}


const remove = async ( req, res, next) => {
    const { commentId, userId } = req.params;
    const { _id, isAdmin } = req.user;

    if (!isAdmin || userId != _id ) {
        return next(error(401, 'You are not allowed to delete this comment'));
    }

    try {
        const findComment = await Comment.findByIdAndDelete(commentId);

        if (!findComment) {
            return next(error(404, 'Comment Not Found'));
        }

        res.json({
            success:true,
            data:[],
            status:200
        });

        
    } catch (error) {
        next(error)
    }
}

export { store, indexPostComments, likeOrUnlike, remove };