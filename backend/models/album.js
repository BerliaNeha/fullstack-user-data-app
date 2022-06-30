import mongoose from "mongoose";

const { Schema } = mongoose;

const albumSchema = new Schema(
  {
    //albums: [{
    albumTitle: { type: String, required: true },
    band: { type: String },
    albumYear: { type: Number, required: true, min: 1900, max: 2022 },
    //}]
  },
  { timestamps: true }
);


const Album = mongoose.model("Album", albumSchema);
export default Album;
