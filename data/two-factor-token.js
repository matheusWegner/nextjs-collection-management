import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token }
    });

    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching getTwoFactorTokenByToken :", error);
    throw error;
  }
};

export const getTwoFactorTokenByEmail = async (email) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email }
    });

    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching getTwoFactorTokenByEmail :", error);
    throw error;
  }
};