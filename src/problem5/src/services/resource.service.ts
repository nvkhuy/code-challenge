import {PrismaClient, Resource} from "@prisma/client";

const prisma = new PrismaClient();

export type CreateResourceDTO = Omit<Resource, "id" | "createdAt" | "updatedAt">;

export const createResource = async (data: CreateResourceDTO) => {
    return prisma.resource.create({data});
};

interface ListParams {
    filterName?: string;
    page: number;
    limit: number;
}

export const listResources = async (params: ListParams) => {
    const {filterName, page, limit} = params;

    const whereClause =
        filterName
            ? {'name': filterName}
            : {};

    // ⚡ Prisma query
    const [items, total] = await Promise.all([
        prisma.resource.findMany({
            where: whereClause,
            orderBy: {createdAt: "desc"},
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.resource.count({where: whereClause}),
    ]);

    return {
        data: items,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getResource = async (id: number) => {
    return prisma.resource.findUnique({where: {id}});
};

export type UpdateResourceDTO = Partial<CreateResourceDTO>;

export const updateResource = async (id: number, data: UpdateResourceDTO) => {
    return prisma.resource.update({where: {id}, data});
};

export const deleteResource = async (id: number) => {
    return prisma.resource.delete({where: {id}});
};
