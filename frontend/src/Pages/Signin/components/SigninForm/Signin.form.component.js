import React, { useState, useContext } from "react";
import { UserContext } from "../../../../Context/UserContext";
import * as SignUpService from "../../services/signin.service";
import { useNavigate } from "react-router-dom";
import * as HomeService from "../../../Home/services/home.service";
import {
  Form,
  FeatherIcons,
  Input,
  Button,
  Checkbox,
  Notification,
} from "../../../../antd_components";
import { FormItem } from "../../../Signup/components/SignupForm/Signup.form.styled";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

const SigninForm = ({ darkPallete }) => {
  const [invalidInfo, setInvalidInfo] = useState(false);
  const { setUser } = useContext(UserContext);

  let navigate = useNavigate();

  const styleInput = {
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "4px",
    marginTop: "-5px",
  };

  function onSubmit(values) {
    const { email, password } = values;

    const dto = {
      email,
      password,
    };

    SignUpService.loginUser(dto).then((res) => {
      const { token, message } = res.data;

      if (token) {
        HomeService.getCurrentUser(`Bearer ${token}`).then((res) => {
          const { data } = res;
          setUser(data);
        });

        Cookie.set("token", `Bearer ${token}`);
        setInvalidInfo(false);

        navigate("/");

        Notification.open({
          type: "success",
          message,
          style: {
            zIndex: 999,
          },
          duration: 2,
        });
      } else {
        setInvalidInfo(true);
      }
    });
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <FormItem
        label='E-mail'
        name='email'
        rules={[
          { required: true, message: "Campo obrigatório." },
          { type: "email", message: "E-mail inválido." },
        ]}
        help={invalidInfo ? "E-mail inválido" : null}
        validateStatus={invalidInfo ? "error" : null}
      >
        <Input
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='mail' size={15} />}
          placeholder='E-mail'
        />
      </FormItem>

      <FormItem
        help={invalidInfo ? "Senha inválida." : null}
        validateStatus={invalidInfo ? "error" : null}
        label='Senha'
        name='password'
        rules={[{ required: true, message: "Campo obrigatório." }]}
      >
        <Input.Password
          style={styleInput}
          allowClear
          prefix={<FeatherIcons icon='lock' size={15} />}
          iconrRender={(visible) =>
            visible ? (
              <FeatherIcons icon='eyeoff' size={15} />
            ) : (
              <FeatherIcons icon='eye' size={15} />
            )
          }
          placeholder='Senha'
        />
      </FormItem>

      <Form.Item
        name='remember'
        valuePropName='checked'
        style={{ float: "right" }}
      >
        <Checkbox>Lembrar senha</Checkbox>
      </Form.Item>

      <Button
        style={{
          width: "100%",
          height: "45px",
          borderRadius: "8px",
          margin: "-15px 0 5px 0",
          background: darkPallete.lightblue,
        }}
        type='primary'
        htmlType='submit'
      >
        Confirmar
      </Button>

      <span>
        ou{" "}
        <Link to='/signup' style={{ color: "#1890ff" }}>
          <span>Crie uma conta</span>
        </Link>
      </span>
    </Form>
  );
};

export default SigninForm;
