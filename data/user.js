import { db } from "@/lib/db";

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({ where: { email:email } });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByEmail:", error);
    throw error;
  }
};

export const getUserByCustumerId = async (custumerId) => {
  try {
    const user = await db.user.findFirst({ where: { custumerId:custumerId } });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByEmail:", error);
    throw error;
  }
};

export const getUserByName = async (name) => {
  try {
    const user = await db.user.findUnique({ 
      where: { name } 
    });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByName:", error);
    throw error;
  }
};

export const getUserByPhone = async (phone) => {
  try {
    const user = await db.user.findUnique({ where: { phone } });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByPhone:", error);
    throw error;
  }
};


export const getUserByPhoneAndNotId = async (phone,id) => {
  try {
    const user = await db.user.findUnique({ 
      where: { 
        phone:phone,
        NOT: [
          {
            id :id
          },
        ],
      } 
    });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByPhone:", error);
    throw error;
  }
};


export const getUserByCpf = async (cpf) => {
  try {
    const user = await db.user.findUnique({ where: { cpf } });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByCpf:", error);
    throw error;
  }
};

export const getUserByCpfAndNotId = async (cpf,id) => {
  try {
    const user = await db.user.findUnique({ 
      where: { 
        cpf:cpf,
        NOT: [
          {
            id :id
          },
        ],
      } 
    });
    return user;
  } catch (error) {
    console.error("Error fetching getUserByCpfAndNotId:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error("Error fetching getUserById:", error);
    throw error;
  }
};
