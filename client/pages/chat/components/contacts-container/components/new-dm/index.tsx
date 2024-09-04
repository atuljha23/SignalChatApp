import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import contactAnimated from "@/assets/lotties/contacts.json";
import apiClient from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTE } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

interface Contacts {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  color: number;
  image: string;
}

function NewDM() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setsearchedContacts] = useState([]);
  const [contactSearchTerm, setcontactSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      searchContacts(contactSearchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [contactSearchTerm]);

  const searchContacts = async (search: string) => {
    try {
      if (search.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTE,
          { search },
          { withCredentials: true }
        );
        setsearchedContacts(response.data.contacts);
      } else {
        setsearchedContacts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {" "}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => {
                setOpenNewContactModal(!openNewContactModal);
              }}
              className="text-black hover:dark:text-slate-500 dark:text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            ></FaPlus>
          </TooltipTrigger>
          <TooltipContent className="border-none p-3">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="flex flex-col min-w-[400px] min-h-[400px]">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Search Contacts"
            className="dark:border-none rounded-lg dark:bg-slate-800"
            onChange={(e) => setcontactSearchTerm(e.target.value)}
          />
          {searchedContacts.length > 0 ? (
            <div>
              {searchedContacts.map((contact: Contacts) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center space-x-2"
                >
                  <div className="w-12 h-12 items-center justify-center relative">
                    <Avatar className="h-12 w-12 items-center justify-center rounded-full overflow-hidden">
                      <AvatarImage
                        src={`${HOST}/${contact?.image}`}
                        alt="profile"
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>
                        <div
                          className={`uppercase h-32 w-32 text-lg border-[1px] flex items-center justify-center ${getColor(
                            contact?.color
                          )}`}
                        >
                          {contact?.firstName
                            ? contact?.firstName.split("").shift()
                            : contact?.email.split("").shift()}
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    {contact?.firstName && contact?.lastName ? (
                      <div className="flex flex-col">
                        <span>{`${contact?.firstName} ${contact?.lastName}`}</span>
                        <span>{contact?.email}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Lottie
                className="h-[150px] dark:text-white"
                animationData={contactAnimated}
                loop={true}
              />
              <p className="text-xl lg:text-2xl text-center">
                Search using name or email
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDM;
