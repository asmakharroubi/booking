import { deleteUser, getAllUser, getsingleUser, updateUser } from "../controllers/userController.js";

const express = require("express");
const router = require("express").Router();

const verifyUser = require('../utils/verifyToken.js')


// update User
router.put("/:id", verifyUser,updateUser);
// delete User
router.delete("/:id",verifyUser, deleteUser);
// get single User
router.post("/:id", verifyUser,getsingleUser);
// get all User
router.get("/:id",verifyAdmin, getAllUser);


export default router;
