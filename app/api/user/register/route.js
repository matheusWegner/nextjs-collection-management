import bcrypt from "bcryptjs";
import { z } from 'zod'
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";


const FormData = z.object({
  name: z.string().min(1).max(70,{message: "name to big"}),
  email: z.string().email().max(64,{message: "email to big"}),
  password: z.string().min(6,{message: "password to small"}),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
});


export const POST = async (request) => {
  try {
        const userForm = await request.json();
        const validResult = FormData.safeParse(userForm);
        if(!validResult.success){
            return new Response(JSON.stringify({message:"Invalid Params",errors:validResult.error.issues}), { status: 400 })
        }
        var user = await getUserByEmail(userForm.email);
        if (user) {
            return new Response(JSON.stringify({message:"Invalid Params",errors:[{ message: "User with this e-mail alredy exists" }]}), { status: 400 });
        }
        const hashPassword = await bcrypt.hash(userForm.password,8);
        user = await db.user.create({
            data: {
                email: userForm.email,
                name: userForm.name,
                password: hashPassword,
                image:"/assets/images/perfil.png"
            },
        });
        const verificationToken = await generateVerificationToken(userForm.email);
        await sendVerificationEmail(
          verificationToken.identifier,
          verificationToken.token,
        );
      
        return new Response(JSON.stringify([{message:"Sucessfully registered account"}]), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:"Internal Server Error",errors:[{ message: 'Failed to register account - ' + error}]}), { status: 500 });
    }
}
