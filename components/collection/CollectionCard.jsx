"use client";
import { useSession } from "next-auth/react"
import { faGear ,faFolderPlus , faFolder , faFileCirclePlus , faTrash , faImage} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";
import Image from "next/image"
const CollectionCard = ({ collection }) => {
  const { data: session } = useSession();

  const items = [
    { id: 1, label: "Collection", icon: faFolder, link: `/collection/update-collection/${collection.id}` },
    { id: 2, label: "Image", icon: faImage, link: `/collection/${collection.id}` },
    { id: 3, label: "New Item", icon: faFileCirclePlus , link: `/collection/${collection.id}/item` },
    { id: 5, label: "Configuration", icon: faGear, link: "/config" },
    { id: 6, label: "Delete", icon: faTrash, link: "/delete" },
  ];
  return (
    <div className="m-12 flex flex-col items-center">
      <div className='flex justify-center w-full'>
        <h1 className='mr-8 text-sm font-extrabold leading-[1.15] text-black'>{collection.name}</h1>
      </div>
      <div className='collection_card flex flex-between m-2'>
            <div className="flex justify-center w-4/5 h-full shadow-inner">
              <Image
                src='/assets/images/perfil.png'
                alt='logo'
                width={30}
                height={30}
                className='object-contain'
              />
            </div>
            <div className="collection_card_menu w-1/5 h-full">
                {session?.user?.id == collection.userId && 
                 items.map(({ icon: Icon, ...menu } , index) => {
                    return (
                    <div key={index}>
                        <Link href={menu.link}>
                          <div className="flex py-1 px-3 items-center w-full h-full">
                              <div style={{ width: "2.5rem" }}>
                                  <FontAwesomeIcon icon={Icon} />
                              </div>
                          </div>
                        </Link>
                    </div>
                    );
                })}
            </div>
      </div>
    </div>
  );
};

export default CollectionCard;
