"use client";
import { withAuth } from "@/middleware/withAuth";
import { useAppStore } from "@/store";
import React, { useEffect, useRef } from "react";
import { IoAdd, IoArrowBack, IoTrashBin } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  DELETE_PROFILE_IMAGE_ROUTE,
  HOST,
  UPDATE_PROFILE,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function Profile() {
  const { userInfo, setUserInfo } = useAppStore();
  const { toast } = useToast();
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [hovered, setHovered] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
      if (userInfo.image) {
        setImage(`${HOST}/${userInfo.image}`);
      }
    }
  }, [userInfo]);

  const handleFileChange = () => {
    if (fileInputRef.current) {
      fileInputRef?.current.click();
    }
  };

  const handleDeleteImage = () => {
    setImage("");
    setUserInfo({ ...userInfo, image: "" });
    try {
      apiClient.delete(DELETE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      toast({
        title: "Success",
        description: "Profile image deleted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to delete profile image", error);
      toast({
        title: "Error",
        description: "Failed to delete profile image",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file); // Append the file with its name
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      });
      if (response.status === 200) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setUserInfo({ ...userInfo, image: response.data.image });
        toast({
          title: "Success",
          description: "Profile image uploaded successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to upload profile image",
          variant: "destructive",
        });
      }
    }
  };

  const saveChanges = async () => {
    try {
      const response = await apiClient.post(
        UPDATE_PROFILE,
        {
          firstName,
          lastName,
          color: selectedColor,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        router.push("/chat");
      } else {
        toast({
          title: "Error",
          description: "Failed to update user info",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to update user info", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack
            onClick={() =>
              userInfo.profileSetup
                ? router.push("/chat")
                : toast({
                    title: "Error",
                    description: "Please complete your profile setup",
                    variant: "destructive",
                  })
            }
            className="text-4xl lg:text-6xl cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              <AvatarImage
                src={image}
                alt="profile"
                className="object-cover w-full h-full"
              />
              <AvatarFallback>
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl flex items-center justify-center ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              </AvatarFallback>
            </Avatar>
            {hovered && (
              <div
                className="absolute bg-black/50 rounded-full inset-0 flex justify-center items-center"
                onClick={image ? handleDeleteImage : handleFileChange}
              >
                {image ? (
                  <IoTrashBin
                    size={60}
                    className="text-white text-3xl cursor-pointer"
                  />
                ) : (
                  <IoAdd
                    className="text-white text-3xl cursor-pointer"
                    size={60}
                  />
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              name="profileImage"
              id="profileImage"
              onInput={handleImageChange}
              className="hidden"
              accept=".png, .jpeg, .svg, .jpg, .webp"
              type="file"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="flex flex-col gap-6">
              <Input
                type="email"
                value={userInfo.email}
                className="rounded-lg p-6 border-none text-black dark:text-white/50 dark:bg-gray-600 bg-slate-300"
                disabled
              />
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 border-none text-black dark:text-white dark:bg-gray-800 bg-slate-300"
                placeholder="First Name"
              />
              <Input
                type="text"
                value={lastName}
                className="rounded-lg p-6 border-none text-black dark:text-white dark:bg-gray-800 bg-slate-300"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <div className="flex gap-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`h-10 w-10 rounded-full cursor-pointer ${color} ${
                      selectedColor === index
                        ? "border-white outline-white outline-4 outline"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <Button
            onClick={saveChanges}
            className="w-full h-16 dark:text-white bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
