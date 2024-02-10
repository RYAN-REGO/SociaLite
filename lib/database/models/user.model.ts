import {Document, model, models, Schema} from 'mongoose';

export interface IUser extends Document{
    clerkId : string,
    email : string,
    firstName : string,
    lastName : string,
    username : string,
}

const UserSchema = new Schema({
    clerkId : {type : String},
    email : {type : String},
    username : {type : String},
    firstName : {type : String},
    lastName : {type : String},
})

const User = models.User || model('User', UserSchema);

export default User;