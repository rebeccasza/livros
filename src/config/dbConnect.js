import mongoose from "mongoose";

mongoose.connect("mongodb+srv://rebeccaszamagna:Feijoada93@cluster0.ifr0s.mongodb.net/Cluster0");

let db = mongoose.connection;

export default db;