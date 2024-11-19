import { Router } from "express";
import { userInfo } from "../schema/userInfo.js";
import { LoginRequestDto,  sejongAuthDelegator } from "@coffee-tree/sejong-auth-delegator";
import { createToken } from "./jwt.js";

const AuthRouter = Router();

AuthRouter.post("/login", async (req, res) => { 
    const { userid, password } = req.body;

    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userid, password);
    // console.log(loginRequestDto);
    try { // 로그인 성공시
        const profile = await delegator.getUserProfile(loginRequestDto);
        console.log(profile);
        if (userInfo.findOne({id : profile.id})) { // 내 디비에 이 회원의 정보가 있으면 코드 수정 필요
            // 로그인 성공 후 토큰을 넘겨줌
            const payload = {
                userid : profile.id,
            }

            const token = createToken(payload);

            res.send(profile);
        }
        else { // 내 디비에 이 회원의 정보가 없으면
            // major, id만 있는 상태로 디비에 저장, 이후 register에서 나머지 정보 추가
            userInfo.insertOne({id: profile.id, major: profile.major});
            res.status(401).send("회원가입 필요");
        }
    }
    catch (error) { // 로그인 실패시
        console.error("Error fetching user profile", error);
        throw error;
    }
});

AuthRouter.post("/register", async (req, res) => { // 여기서 토큰 넘겨야 함 회원가입 api
    const { name, id, major, phNumber, userType } = req.body; // 정보 받고
    try{
        await userInfo.findOneAndUpdate({id : id}, {name: name, major: major, phNumber: phNumber, userType: userType});
        const payload = {
            userid : id,
        }
        const token = createToken(payload);

        res.cookie('AccessToken', token, { httpOnly: true, maxAge : 1000 * 60 * 60 });
        res.redirect('/login'); // 토큰 발급 끝나면 메인화면으로 넘어감
    } catch (err) {
        res.status(400).send(err);
    }
})

export default  AuthRouter;