import { useNavigate } from "react-router";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { SignupForm } from "../../components/signupForm";

export const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <section style={{ margin: "4rem auto", minWidth: "16rem", maxWidth: "30%" }}>
      <Title>Cadastro</Title>
      <SignupForm />
      <Button
        type="default"
        htmlType="button"
        size="large"
        block={true}
        onClick={() => navigate("/")}
      >
        Voltar para login
      </Button>
    </section>
  );
};
