const ApiError = require("../error/ApiError");
const { create, updateChat } = require("../services/chatService");
const { send, deleteMessage } = require("../services/messageService");
const Filter = require("bad-words");
const filter = new Filter();

class messageController {
    send = async(req, res, next) => {
        try {
            let { chatId, from, to, text } = req.body;
            let isFirstTime;
            if (!chatId) {
                const result = await create(from, to);
                isFirstTime = result.isFirstTime;
                chatId = result.chatId;
            }else{
                await updateChat(chatId);
            };
            // Middleware
            if (!from) throw new Error(
                "You didn't specify sender adress"
            );
            if (!to) throw new Error(
                "You didn't specify recipient adress"
            );
            if (!text) throw new Error(
                "You didn't provide a text"
            );
            if (filter.isProfane(text)) next(ApiError.badRequest("Your message is profane"));
            // Middleware
            const response = await send(chatId, from, to, text, isFirstTime);
            res.json(response);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    delete = async(req, res, next) => {
        try {
            const { id: chatterId } = req.body;
            const { chatId, messageId } = req.body.data;
            if (!chatId) throw new Error(
                "You didn't specify the message chat"
            );
            if (!messageId) throw new Error(
                "You didn't specify which message you want to delete"
            );
            await deleteMessage(chatId, messageId, chatterId);
            res.json({message: "have a good day"})
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
};

module.exports = new messageController();