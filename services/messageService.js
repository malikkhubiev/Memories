const { Chat, Message, User } = require("../models");
const { clearOrDeleteOneChatItem } = require("./common/common");

class messageService {
    send = async (chatId, from, to, text, isFirstTime) => {
        const message = await Message.create({ idOfChat: chatId, from, to, text });
        const chat = await Chat.findOne({ where: { id: chatId } });
        const messages = await Message.findAll({ where: { idOfChat: chat.id } });
        const updatedMessages = [];
        for (let j = 0; j < messages.length; j++) {
            const message = messages[j];
            if (
                chat.dataValues.firstChatterId === from
                && message.dataValues.visibleForFirstChatter === false
                ||
                chat.dataValues.secondChatterId === from
                && message.dataValues.visibleForSecondChatter === false
            ) continue;
            if (message.dataValues.from === from)
                message.dataValues.isOwn = true;
            else
                message.dataValues.isOwn = false;
            updatedMessages.push(message.dataValues);
        };
        chat.dataValues.messages = updatedMessages;
        chat.dataValues.lastMessage = updatedMessages[updatedMessages.length - 1];
        const chatter = await User.findOne({ where: { id: to } });
        const response = {
            message: message.dataValues,
        };
        if (isFirstTime) {
            response.chat = {
                ...chat.dataValues,
                chatterName: chatter.name,
                chatterAva: chatter.avatar,
            };
        };
        return response;
    };
    deleteMessage = async (chatId, messageId, chatterId) => {
        const updateObject = await clearOrDeleteOneChatItem(chatId, chatterId);
        await Message.update(
            updateObject,
            { where: { id: messageId } }
        );
    };
};

module.exports = new messageService();