import {
    sejongAuthDelegator,
    LoginRequestDto,
} from "@coffee-tree/sejong-auth-delegator";
import { userInfo } from "../schema/userInfo.js"
import { strict as assert } from "assert";

const id = userInfo.id; // 테스트



const login = (userid, password) => {
    const delegator = sejongAuthDelegator();

    const LoginRequestDto = new LoginRequestDto(userid, password);

    try {
        const profile = await delegator.getUserProfile(LoginRequestDto);
        return profile;
    } catch (error) {
        console.log("Error fetching user profile", error);
        throw error;
    }
};