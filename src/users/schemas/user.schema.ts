import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
    collection: 'users',
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, dropDupes: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('findOneAndUpdate', async function(next: Function) {
//     // const user = await this.model.findOne(this.getQuery());
//     const updatedUser:any = this
//     const updateBody = updatedUser._update
//     if(updateBody.password)
//         updateBody.password = await bcrypt.hash(updateBody.password, 10);
// });

// UserSchema.pre<User>(['save', /*'findOneAndUpdate', 'updateOne'*/], async function (next: Function) {
//     const user = this;
//     if (user.password)
//         user.password = await bcrypt.hash(user.password, 10);
// });

export { UserSchema }