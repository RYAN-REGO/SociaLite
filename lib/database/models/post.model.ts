import { Document, Schema, model, models } from 'mongoose';

export interface IPost extends Document{
    description : string,
    imageUrl : string,
    creator : {_id : string, firstName : string, latName : string},
}

const PostSchema = new Schema({
    description : {type : String},
    imageUrl : {type : String},
    creator : {type : Schema.Types.ObjectId, ref : 'User'},
})

const Post = models.Post || model('Post', PostSchema);

export default Post;