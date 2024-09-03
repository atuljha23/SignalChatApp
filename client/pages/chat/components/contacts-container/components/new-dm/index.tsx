import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

function NewDM() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
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
    </>
  );
}

export default NewDM;
