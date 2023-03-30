import { createReview } from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";


const express = require("express");
const router = require("express").Router();

router.post('/:tourId',verifyUser,createReview)

export default router