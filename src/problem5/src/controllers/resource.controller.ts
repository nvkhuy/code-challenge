import {Request, Response} from "express";
import * as resourceService from '../services/resource.service';

// CREATE
export const createResource = async (req: Request, res: Response) => {
    try {
        const resource = await resourceService.createResource(req.body);
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({error: String(error)});
    }
};

// LIST
export const listResources = async (req: Request, res: Response) => {
    try {
        // Pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        // Filtering ("name")
        const filterName = req.query.name as string | undefined;

        const result = await resourceService.listResources({
            filterName,
            page,
            limit,
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
};


// DETAIL
export const getResource = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const resource = await resourceService.getResource(id);
    if (!resource) return res.status(404).json({error: "Not found"});
    res.json(resource);
};

// UPDATE
export const updateResource = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const resource = await resourceService.updateResource(id, req.body);
        res.json(resource);
    } catch {
        res.status(404).json({error: "Not found"});
    }
};

// DELETE
export const deleteResource = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await resourceService.deleteResource(id);
        res.status(204).send();
    } catch {
        res.status(404).json({error: "Not found"});
    }
};
