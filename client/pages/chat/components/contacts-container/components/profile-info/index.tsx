import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HOST, LOGOUT_ROUTE } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { IoPowerSharp } from "react-icons/io5";
import apiClient from "@/lib/api-client";

function ProfileInfoComponent() {
  const { userInfo, setUserInfo } = useAppStore();
  const router = useRouter();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        router.push("/auth");
        setUserInfo(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-6 rounded-full h-16 flex items-center justify-between px-10 w-full bg-slate-800">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 items-center justify-center relative">
          <Avatar className="h-12 w-12 items-center justify-center rounded-full overflow-hidden">
            <AvatarImage
              src={`${HOST}/${userInfo?.image}`}
              alt="profile"
              className="object-cover w-full h-full"
            />
            <AvatarFallback>
              <div
                className={`uppercase h-32 w-32 text-lg border-[1px] flex items-center justify-center ${getColor(
                  userInfo?.color
                )}`}
              >
                {userInfo?.firstName
                  ? userInfo?.firstName.split("").shift()
                  : userInfo?.email.split("").shift()}
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          {userInfo?.firstName && userInfo?.lastName
            ? `${userInfo?.firstName} ${userInfo?.lastName}`
            : null}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                onClick={() => router.push("/profile")}
                className="text-purple-500 text-lg font-medium"
              ></FiEdit2>
            </TooltipTrigger>
            <TooltipContent className="border-none">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                onClick={logOut}
                className="text-red-500 text-lg font-medium"
              ></IoPowerSharp>
            </TooltipTrigger>
            <TooltipContent className="border-none">
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfoComponent;
