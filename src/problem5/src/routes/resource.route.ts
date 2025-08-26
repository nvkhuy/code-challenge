import {Router} from "express";
import {
    createResource,
    listResources,
    getResource,
    updateResource,
    deleteResource,
} from "../controllers/resource.controller";

const router = Router();

router.post("/resources", createResource);
router.get("/resources", listResources);
router.get("/resources/:id", getResource);
router.put("/resources/:id", updateResource);
router.delete("/resources/:id", deleteResource);

export default router;