import { Router } from "express";
import { userInfo } from "../schema/userInfo.js";
import { LoginRequestDto,  sejongAuthDelegator } from "@coffee-tree/sejong-auth-delegator";

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
    const { userid, password } = req.body;

    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userid, password);
    // console.log(loginRequestDto);
    try { // 로그인 성공시
        const profile = await delegator.getUserProfile(loginRequestDto);
        console.log(profile)
        if ("내 디비에 이 회원의 정보가 있으면") {
            // 로그인 성공 후 토큰을 넘겨줌
        }
        else { // 내 디비에 이 회원의 정보가 없으면
            // major, id만 있는 상태로 디비에 저장

        }
    }
    catch (error) { // 로그인 실패시
        console.error("Error fetching user profile", error);
        throw error;
    }
});

AuthRouter.post("/register", (req, res) => { // 여기서 토큰 넘겨야 함
    const { name, id, major, phNumber, userType } = req.body;
    try{
        userInfo.findOneAndUpdate({id : id}, {name: name, major: major, phNumber: phNumber, userType: userType});
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(400).send(err);
    }
})

export default  AuthRouter;