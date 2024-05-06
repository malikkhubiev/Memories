import React, { FC, useEffect } from "react";
import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
import { optionActionCallbackType } from "../../../../types/callbacks";
import { ColumnWrap } from "../../../layout/ColumnWrap/ColumnWrap";
import { ButtonComponent } from "../../CustomMenu/CustomComponents/CustomMenuComponents";
import { CustomMenu } from "../../CustomMenu/CustomMenu";

let socialMedia: any = [
  {
    id: 0,
    props: {
      button: TelegramShareButton,
      icon: TelegramIcon,
      name: "Telegram",
    },
  },
  {
    id: 1,
    props: {
      button: WhatsappShareButton,
      icon: WhatsappIcon,
      name: "WhatsApp",
    },
  },
];

export const Share: FC<SharePropsType> = ({ url }) => {
  useEffect(() => {
    socialMedia.forEach((media: any) => {
      media["component"] = ButtonComponent;
    });
  }, []);

  const handler: optionActionCallbackType<any> = (action) => {};

  return (
    <div>
      <ColumnWrap removePadding={true}>
        <CustomMenu
          menuOptions={socialMedia}
          callback={handler}
          icon={"share"}
          iconWidth="40"
          url={url}
        />
      </ColumnWrap>
    </div>
  );
};

export type SharePropsType = {
  url: string;
};
