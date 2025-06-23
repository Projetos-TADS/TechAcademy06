import { useContext, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message } from "antd";
import { UserContext } from "../../providers/UserContext";
import { TUserUpdateFormValues, userUpdateSchema } from "./userUpdateFormSchema";

export const UserEditForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const { userUpdate, user } = useContext(UserContext);
	const [loading, setLoading] = useState(false);

	const { control, handleSubmit } = useForm<TUserUpdateFormValues>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
		},
	});

	const onSubmit: SubmitHandler<TUserUpdateFormValues> = async newUserData => {
		try {
			setLoading(true);

			const filteredData = Object.fromEntries(
				Object.entries(newUserData).filter(
					([key, value]) => value !== undefined && value !== "" && key !== "confirmPassword"
				)
			);

			if (Object.keys(filteredData).length > 0) {
				await userUpdate(filteredData, setLoading);
				message.success("Dados atualizados com sucesso!");
				onSuccess();
			}
		} catch (error) {
			message.error("Erro ao atualizar dados");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
			<Controller
				name="name"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="Nome"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							{...field}
							placeholder="Seu nome"
							disabled={loading}
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="E-mail"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							{...field}
							type="email"
							placeholder="Seu e-mail"
							disabled
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="Nova Senha"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
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

			<Controller
				name="confirmPassword"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="Confirme a Senha"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
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
				<Button type="primary" htmlType="submit" loading={loading} block>
					{loading ? "Atualizando..." : "Atualizar dados"}
				</Button>
			</Form.Item>
		</Form>
	);
};
