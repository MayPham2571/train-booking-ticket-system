const express = require("express");
const tripController = require("../controllers/tripController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post("/", jwtAuth, tripController.getTrip);
router.post(
  "/createTrip",
  jwtAuth,
  authorize("admin"),
  tripController.createTrip
);
router.delete("/:id", jwtAuth, authorize("admin"), tripController.deleteTrip);
router.patch("/:id", jwtAuth, authorize("admin"), tripController.updateTrip);
module.exports = router;
