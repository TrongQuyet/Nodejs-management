import express from "express";
import homecontroller from "../controller/homecontroller";
import path from "path";
const multer = require("multer");
const appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initwebroute = (app) => {
  router.get("/", homecontroller.gethomepage);
  router.get("/detail/:id", homecontroller.detailuser);
  router.post("/createuser", homecontroller.createnewuser);
  router.post("/updateuser", homecontroller.updateuser);
  router.get("/delete/:id", homecontroller.deleteuser);
  router.get("/edituser/:id", homecontroller.edituser);
  router.get("/upload", homecontroller.uploadfile);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homecontroller.profile
  );
  router.post(
    "/upload-multiple-images",
    upload.array("multiple_images", 3),
    homecontroller.uploadmultiple
  );

  return app.use("/", router);
};

export default initwebroute;
