const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports = (io) => {
    io.on("connection", async(socket) => {
        console.log("client is connected ", socket.id);

        socket.on("login", async(userName, cb) => {
            // 유저정보 저장
            try{
                const user = await userController.saveUser(userName, socket.id);
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: {id: null, name: "system"},
                }
                io.emit("message", welcomeMessage);
                cb({ok:true, data:user});
            }catch(error){
                cb({ok:false, error:error.message});
            }
        });
        
        socket.on("sendMessage", async(message, cb) => {
            try{
                // 유저 찾기 socket.id
                const user = await userController.checkUser(socket.id);
                console.log("client sendMessage ");
                // 메세지 저장
                const newMessage = await chatController.saveChat(message, user);
                io.emit("message", newMessage);
                cb({ok:true});
            }catch(error){
                cb({ok:false, error:error.message});
            }
        });

        socket.on("joinRoom", async (rid, cb) => {
            try {
              const user = await checkUser(socket.id); // 일단 유저정보들고오기
              await roomController.joinRoom(rid, user); // 1~2작업
              socket.join(user.room.toString());//3 작업
              const welcomeMessage = {
                chat: `${user.name} is joined to this room`,
                user: { id: null, name: "system" },
              };
              io.to(user.room.toString()).emit("message", welcomeMessage);// 4 작업
              io.emit("rooms", await roomController.getAllRooms());// 5 작업
              cb({ ok: true });
            } catch (error) {
              cb({ ok: false, error: error.message });
            }
          });

        socket.on("disconnect", () => {
            console.log("client is disconnected ", socket.id);
        });
    });
};