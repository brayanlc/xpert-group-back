import bcrypt from 'bcrypt';
import { UserModel } from '../schema/user-schema';
import { User } from '../models/user';

export const registerUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userModel = new UserModel({ ...user, password: hashedPassword });
  return await userModel.save();
};

export const loginUser = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username }).lean();
  console.log(user);
  if (!user) throw new Error('User not found');
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');
  return {...user, password: undefined};
};
