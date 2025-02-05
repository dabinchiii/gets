import React, {useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import {useTranslation} from "react-i18next";
import link from "../../link"

const SignInBox = ({login, setLogin}) => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const history = useHistory();
    const {t, i18n} = useTranslation()
    const handleEmailChange = (event) => {
        SetEmail(event.target.value);
    }
    const handlePasswordChange = (event) => SetPassword(event.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(link.base + '/auth/signin', {
            email: email,
            pw: password
        }, {withCredentials: true})
            .then(response => {
                if (response.data.result) {
                    axios.get(link.base + '/auth/user', {withCredentials: true})
                        .then(response => {
                            setLogin(response.data.result)
                            sessionStorage.setItem("token", response.data.email)
                            history.goBack()
                            // window.location.replace(document.referrer)
                        })
                    // isLogin()
                } else {
                    alert("이메일과 비밀번호를 확인해주세요.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let signForm
    signForm = (
        <div id="sign_form">
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="email" name={"email"} value={email} placeholder={t("input_id")}
                           onChange={handleEmailChange}
                           required/>
                </label>

                <label>
                    <input type="password" name={"password"} placeholder={t("input_password")} value={password}
                           onChange={handlePasswordChange} required/>
                </label>
                <input id="submit" type="submit" value={t("login")}/>

            </form>
        </div>
    )
    return (
        <div>
            {signForm}
        </div>
    )
}

export default SignInBox