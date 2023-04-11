import React, { useEffect, useState } from "react";
import { Props } from "./useMessagePopup.interface";
import { message as AntDMessage } from "antd";

export const useMessagePopup = () => {
  const [messagePopup, setMessagePopup] = useState<string>("");

  useEffect(() => {
    console.log({messagePopup})
    if (messagePopup) AntDMessage.success(messagePopup.toString());
  }, [messagePopup]);

  return { messagePopup, setMessagePopup };
};
