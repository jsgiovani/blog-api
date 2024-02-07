import Post from "../models/Post.js";
import { error } from "../utils/errorHandler.js";


const index = async ( req, res, next ) => {
    try {

        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const order = req.query.order ==='asc' ? 1:-1 || 1;

        

        const posts = await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title: {$regex: req.query.searchTerm, $options:'i'}},
                    {content: {$regex: req.query.searchTerm, $options:'i'}}
                ],
            }),
        }).sort({ updatedAt: order}).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()
        );


        const lastMonthPosts = await Post.countDocuments({createdAt:{$gte:oneMonthAgo}});


        res.json({
            success:true,
            data:{
                posts,
                totalPosts,
                lastMonthPosts
            },
            status:201
        });

            

    } catch (error) {
        next(error);
    }
}

//create a new post
const store = async ( req, res, next) => {

    if (!req.user.isAdmin) {
        return next(error(401, 'Unauthorized, You are not allowed to create a post'));
    }

   const {title, content} = req.body;

   if (!title || !content) {
    return next(error(401, 'Please provide all required fields'));
   }


   try {


    const slug = req.body.title.trim().split(' ').join('-').toLowerCase().replace(/[^a-zA-A0-9-]/g,'');
    
    const postObj = {
    ...req.body,
    slug,
    userId:req.user.id
    };
    
    const newPost = new Post(postObj);

    const request = await newPost.save();




    res.json({
    success:true,
    data:request,
    status:201
    });
    
   } catch (error) {
    next(error);
   }



    
};

 
const remove = async ( req, res, next) =>{
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(error(401, 'Unauthorized, You are not allowed to delete this post'));
    }



    try {
        const findPost = await Post.findByIdAndDelete(req.params.id);

        if (!findPost) {
            return next(error(404, 'Not Found'));
        }


        res.json({
            success:true,
            data:findPost,
            status:201
        });

        
    } catch (error) {
        next(error);
    }

    

}

///api url to update post
const update = async ( req, res, next ) => {

    const {title, content, category, image} = req.body;

    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return error(401, 'Unauthorized, you are not allowed to update this post')
    }

    try {
        const postFound = await Post.findByIdAndUpdate(req.params.id, {
            $set:{
                title,
                content,
                category,
                image
            }
        } , {new:true});

        if (!postFound) {
            return next(error(404, 'Not Found'));    
        }

        res.json({
            success:true,
            data:postFound,
            status:204
        });

    } catch (error) {
        next(error);
    }


};



export { store, index, remove, update };