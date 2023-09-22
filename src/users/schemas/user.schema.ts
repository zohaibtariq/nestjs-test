import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
    collection: 'users',
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User extends Document{

    @Prop({ required: true, unique: true, dropDupes: true })
    username: string;

    @Prop({ required: true })
    password: string;

}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>(['save', /*'findOneAndUpdate', 'updateOne'*/], function (next: Function) {
    const user = this;
    if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        })
    }
    else
        next();
});

export { UserSchema }