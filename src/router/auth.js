import { Router } from "express";
import { LoginRequestDto,  sejongAuthDelegator } from "@coffee-tree/sejong-auth-delegator";

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => {
    const { userid, password } = req.body;

    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userid, password);

    try { // 로그인 성공시
        const profile = await delegator.getUserProfile(loginRequestDto);
        res.send(profile);
    }
    catch (error) { // 로그인 실패시
        console.error("Error fetching user profile", error);
        throw error;
    }
});

export default  AuthRouter;