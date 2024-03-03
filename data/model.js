import { db } from "@/lib/db";


export const getItems = async (collection,model,year,skip,limit) => {
  try {
    var clause = {};
    var where = {
      collectionId:collection
    };
    if(year){
      where.year = year;
    }
    if(model){
      where.model = {
          contains: model,
          mode: 'insensitive'
      }
    }
    if(skip){
      clause.skip = skip;
    }
    if(limit){
      clause.take = limit;
    }
    clause.where = where;
    const items = await db.item.findMany({
      ...clause,
      orderBy: [
        {
          model: 'asc',
        }
      ],
    });
    return items;
  } catch (error) {
    console.log("Error fetching getItems:" + error);
    throw error;
  }
}

export const existItem = async (collection,model,year) => {
  try {
    var where = {
      typeCollectionId:collection,
      year:year,
      model:model
    };
    const items = await db.item.findFirst({
      where: { 
        ...where
      },
      distinct: ['model','year'],
    });
    return items;
  } catch (error) {
    console.log("Error fetching getItems:" + error);
    throw error;
  }
}

export const getItemByCollectionModelLike = async (collection,key) => {
  try {
    const items = await db.item.findMany({
      where: { 
        model : {
            contains: key,
            mode: 'insensitive'
        },
        typeCollectioId:collection
      },
      distinct: ['model'],
    });
    return items;
  } catch (error) {
    console.log("Error fetching getItemByModel:" + error);
    throw error;
  }
};

export const getItemsByModelAndYear = async (model,year) => {
  try {
    const items = await db.item.findMany({
      where: { 
        model : {
            contains: key,
            mode: 'insensitive'
        }
      },
      distinct: ['model'],
    });
    return items;
  } catch (error) {
    console.log("Error fetching getItemByModel:" + error);
    throw error;
  }
};

export const getItemsByModelLike = async (key) => {
  try {
    const items = await db.item.findMany({
      select:{
        model:true,
        id:true
      },
      where: { 
        model : {
            contains: key,
            mode: 'insensitive'
        }
      },
      distinct: ['model'],
      orderBy: [
        {
          model: 'asc',
        }
      ],
    });
    return items;
  } catch (error) {
    console.log("Error fetching getItemByModel:" + error);
    throw error;
  }
};


export const getItemById = async (id) => {
  try {
    const items = await db.item.findFirst({
      where: { 
        id : id
      },
      distinct: ['model'],
    });
    return items;
  } catch (error) {
    console.log("Error fetching getItemByModel:" + error);
    throw error;
  }
};