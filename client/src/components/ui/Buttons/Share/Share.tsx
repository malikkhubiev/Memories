import React, { FC, useEffect } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  TelegramIcon,
  TelegramShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { CustomShareIcon } from "../../CustomIcons/CustomIcons";
import { CustomMenu } from "../../CustomMenu/CustomMenu";
import { ButtonComponent } from "../../CustomMenu/CustomComponents/CustomMenuComponents";
import styles from "./Share.module.less";
import { ColumnWrap } from "../../../layout/ColumnWrap/ColumnWrap";
import { optionActionCallbackType } from "../../../../types/callbacks";

let socialMedia: any = [
  {
    id: 1,
    props: { button: MailruShareButton, icon: MailruIcon, name: "Mail.ru" },
  },
  {
    id: 2,
    props: {
      button: LinkedinShareButton,
      icon: LinkedinIcon,
      name: "LinkedIn",
    },
  },
  { id: 3, props: { button: OKShareButton, icon: OKIcon, name: "OK" } },
  {
    id: 4,
    props: {
      button: TelegramShareButton,
      icon: TelegramIcon,
      name: "Telegram",
    },
  },
  {
    id: 5,
    props: { button: ViberShareButton, icon: ViberIcon, name: "Viber" },
  },
  { id: 6, props: { button: VKShareButton, icon: VKIcon, name: "VK" } },
  {
    id: 7,
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
          icon={CustomShareIcon}
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
