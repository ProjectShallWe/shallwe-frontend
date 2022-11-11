import {computed} from "vue";
import store from "@/store";

/** emailValidCheck Logic */
const emailValidCheck = async (email) => {
    if (!emailValid(email)) {
        return {
            valid: false,
            message: "이메일 양식에 맞지 않습니다."
        }
    }

    if ((await isEmailDuplicate(email)).value) {
        return {
            valid: false,
            message: "사용중인 이메일 입니다."
        }
    }

    return {
        valid: true,
        message: "사용할 수 있는 이메일입니다."
    }
}

const emailValid = (email) => {
    const regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regexp.test(email);
}

const isEmailDuplicate = async (email) => {
    await store.dispatch("signUp/checkEmailDuplicate", {
        email
    });
    return computed(() => store.state.signUp.emailDuplicateCheck);
}


/** nicknameValidCheck Logic */
const nicknameValidCheck = async (nowNickname, newNickname) => {
    if (nowNickname === newNickname) {
        return {
            valid: false,
            message: "현재 사용중인 닉네임입니다."
        };
    }
    if (!nicknameValid(newNickname)) {
        return {
            valid: false,
            message:"닉네임은 2글자 이상 10글자 이하 한글, 영문 대소문자, 숫자를 사용할 수 있습니다."
        };
    }

    if ((await isNicknameDuplicate(newNickname)).value) {
        return {
            valid: false,
            message:"사용중인 닉네임 입니다."
        };
    }

    return {
        valid: true,
        message:"사용할 수 있는 닉네임 입니다."
    }

}

const nicknameValid = (nickname) => {
    const regexp = /^[가-힣A-Za-z0-9]{2,10}$/;
    return regexp.test(nickname);
}

const isNicknameDuplicate = async (nickname) => {
    await store.dispatch("userInfo/checkNicknameDuplicate", {
        nickname
    })
    return computed(() => store.state.userInfo.nicknameDuplicateCheck);
}


/** passwordValidCheck Logic */
const passwordValidCheckInSecurity = async (nowPassword, newPassword, verifyNewPassword) => {
    if (nowPassword === newPassword) {
        return {
            valid: false,
            message: "현재 사용하고 있는 비밀번호와 같습니다."
        }
    }

    if (newPassword !== verifyNewPassword) {
        return {
            valid: false,
            message: "새 비밀번호와 새 비밀번호 확인이 다릅니다."
        }
    }

    if (!passwordValid(newPassword)) {
        return {
            valid: false,
            message: "비밀번호는 8글자 이상 20글자 이하 문자, 숫자, 특수문자를 포함해야합니다."
        }
    }

    if (!(await checkNowPassword(nowPassword)).value) {
        return {
            valid: false,
            message: "현재 사용하고 있는 비밀번호를 확인해주세요."
        }
    }

    return {
        valid: true,
        message: "사용할 수 있는 비밀번호입니다."
    }
}

const passwordValidCheckInSignUp = (password, verifyPassword) => {
    if (password !== verifyPassword) {
        return {
            valid: false,
            message: "비밀번호와 비밀번호 확인이 다릅니다."
        }
    }

    if (!passwordValid(password)) {
        return {
            valid: false,
            message: "비밀번호는 8글자 이상 20글자 이하 문자, 숫자, 특수문자를 포함해야합니다."
        }
    }

    return {
        valid: true,
        message: "사용할 수 있는 비밀번호입니다."
    }
}

const passwordValid = (password) => {
    const regexp = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return regexp.test(password);
}

const checkNowPassword = async (nowPassword) => {
    await store.dispatch("userSecurity/checkNowPassword", {
        nowPassword
    });
    return computed(() => store.state.userSecurity.isNowPassword);
}

export {
    emailValidCheck,
    nicknameValidCheck,
    passwordValidCheckInSecurity,
    passwordValidCheckInSignUp
};