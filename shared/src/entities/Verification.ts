import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { SavedUser } from "./User";

@modelOptions({
  schemaOptions: { collection: "verification", timestamps: true },
})
@index(
  { createdAt: -1 },
  { expireAfterSeconds: 15, partialFilterExpression: { confirmed: false } }
)
export class Verification {
  @prop({ ref: () => SavedUser })
  user: Ref<SavedUser>;

  @prop()
  uuid: string;

  @prop({ default: Date.now, index: true })
  public createdAt?: Date;
}

export const VerificationModel = getModelForClass(Verification);
