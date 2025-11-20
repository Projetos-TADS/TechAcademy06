import { useNavigate } from "react-router";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { LoginForm } from "../../components/signinForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        margin: "4rem auto",
        minWidth: "16rem",
        maxWidth: "30%",
      }}
    >
      <Title>Login</Title>
      <LoginForm />
      <Button
        type="default"
        htmlType="button"
        size="large"
        block={true}
        onClick={() => navigate("/signup")}
      >
        Cadastre-se
      </Button>
    </section>
  );
};
