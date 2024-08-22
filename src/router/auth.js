import { Router } from "express";
import { LoginRequestDto,  sejongAuthDelegator } from "@coffee-tree/sejong-auth-delegator";
import { userInfo } from "../schema/userInfo.js"
import { strict as assert } from "assert";

const AuthRouter = Router();


AuthRouter.post('/login', async (req, res) => {
    const { body } = req;
    const userid = userInfo.getMaxListeners(body.id);

    const loginFailedTest  = async () => {
        const delegator = sejongAuthDelegator();
    
        const loginRequestDto = new LoginRequestDto(userid, password);
    
        try {
            const profile = await delegator.getUserProfile(loginRequestDto);
            return profile;
    
            assert.fail("Test Failed: loginFailedTest");
        } catch (error) {
            assert.match(
                error.message,
                /Failed : login failed/,
                "Unexpected error message"
            );
            console.log("Test passed: loginFailedTest");
        }
    };
    
    const loginSuccessTest = async (userid, password) => {
        const delegator = sejongAuthDelegator();
        const loginRequestDto = new LoginRequestDto(userid, password);
    
        try {
            const profile = await delegator.getUserProfile(loginRequestDto);
            console.log("Test Passed : loginSuccessTest");
        } catch (error) {
            assert.match(
                error.message,
                /Failed : login failed/,
                "Unexpected error message"
            );
            assert.fail("Test Failed: loginSuccessTest");
        }
    };
    
    loginFailedTest();
    if (process.env.TEST_USER_PASSWORD) {
        loginSuccessTest();
    } else {
        console.log(process.env.TEST_USER_PASSWORD);
        console.log("export TEST_USER_PASSWORD = 'password'");
    }
});

export default  AuthRouter;