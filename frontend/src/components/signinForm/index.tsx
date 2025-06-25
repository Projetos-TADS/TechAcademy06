import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Alert } from "antd";
import { UserContext } from "../../providers/UserContext";
import { loginFormSchema, TLoginFormValues } from "./loginFormSchema";

export const LoginForm = () => {
  const { userSignin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: TLoginFormValues) => {
    try {
      setLoading(true);
      await userSignin(data, setLoading);
    } catch (err) {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ maxWidth: "100%" }}>
      {error && <Alert message={error} type="error" showIcon={true} style={{ marginBottom: 24 }} />}

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Item
            label="Email"
            validateStatus={fieldState.error ? "error" : ""}
            help={fieldState.error?.message}
          >
            <Input
              {...field}
              type="email"
              status={fieldState.error ? "error" : ""}
              placeholder="seu@email.com"
              disabled={loading}
            />
          </Form.Item>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Form.Item
            label="Senha"
            validateStatus={fieldState.error ? "error" : ""}
            help={fieldState.error?.message}
          >
            <Input
              type="password"
              {...field}
              status={fieldState.error ? "error" : ""}
              placeholder="Sua senha"
              disabled={loading}
            />
          </Form.Item>
        )}
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block={true} size="large">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </Form.Item>
    </Form>
  );
};
