import {
    sejongAuthDelegator,
    LoginRequestDto,
} from "@coffee-tree/sejong-auth-delegator";

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