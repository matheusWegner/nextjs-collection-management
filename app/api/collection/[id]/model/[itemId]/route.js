import { db } from '@/lib/db';
import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth"
import { getCollectionById } from '@/data/collection';
import { getItemById } from '@/data/model';
import { getUserItem } from '@/data/userItem'
import {formDataToObject,handleResponse} from "@/lib/util"
import {uploadFile} from "@/lib/s3Client"
import {UserItemsSchema} from "@/schemas/zod.schemas"

export async function GET(request,{ params }) {
  const  id  = params.id;
  const  itemId  = params.itemId;
  const userItemExist = await getUserItem(id,itemId);
  if(!userItemExist){
    return  handleResponse(JSON.stringify({ errors: [{ message: `Item not found`}] }),200,'application/json;charset=utf-8')
  }
  return  handleResponse(JSON.stringify(items),200,'application/json;charset=utf-8')
}
  
export const PUT = async (request, response) => {
  try {
      const session = await getServerSession(authOptions);
      const itemForm = await request.formData();
      const userItem = await formDataToObject(itemForm);
      const validResult = UserItemsSchema.safeParse(userItem);
      if (!validResult.success) {
          return new Response(JSON.stringify({ errors: validResult.error.issues }), { status: 400 })
      }
      const collectionExist = await getCollectionById(userItem.collectionId);
      if(!collectionExist){
        return new Response(JSON.stringify({ errors: [{ message: `Collection ${userItem.collectionId} not found` }] }), { status: 400 });
      }
      if(collectionExist.userId !== session.user?.id){
        return new Response(JSON.stringify({ errors: [{ message: `You have no permissions for add items to this collection` }] }), { status: 400 });
      }
      const itemExist = await getItemById(userItem.itemId);
      if(!itemExist){
        return new Response(JSON.stringify({ errors: [{ message: `Item ${userItem.itemId} not found`}] }), { status: 400});
      }

      const userItemExist = await getUserItem(userItem.collectionId,userItem.itemId);
      if(!userItemExist){
        return new Response(JSON.stringify({ errors: [{ message: `Item not found`}] }), { status: 400});
      }

      const newItem = await db.$transaction(async (tx) => {
          const item = await tx.userItem.update({
              where:{
                itemId: userItem.itemId,
                userCollectionId: userItem.collectionId
              },
              data: {
                name:userItem.name,
                description:userItem.description
              },
          });
          await Promise.all(userItem.files?.map(async (f) => {
              const filePath = `collections/${userItem.collectionId}/${userItem.itemId}/${encodeURIComponent(f.name)}`;
              const link = encodeURI(`${process.env.AWS_BUCKET_URL}/${filePath}`);
              await tx.userItemImage.update({
                where: {
                    id:f.id
                },
                data: {
                  link: link,
                  fileName: f.name
                },
              });
              const resultUpload = await uploadFile(filePath, f);
              if (resultUpload?.$metadata?.httpStatusCode != 200) {
                throw new Error(`Error model file`);
              }
          }));  
          return item;
      });
      return new Response(JSON.stringify(newItem), { status: 200 });
  } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ errors: [{ message: "Failed to update collection item ," + error }] }), { status: 500 });
  }
}