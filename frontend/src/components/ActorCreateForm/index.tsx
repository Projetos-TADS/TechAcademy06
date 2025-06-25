import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Modal, DatePicker } from "antd";
import dayjs from "dayjs";
import { ActorContext } from "../../providers/ActorContext";
import { actorCreateFormSchema, TActorCreateFormValues } from "./actorCreateFormSchema";

interface CreateNewActorFormProps {
	open: boolean;
	onClose: () => void;
}

export const CreateNewActorForm = ({ open, onClose }: CreateNewActorFormProps) => {
	const { actorCreate } = useContext(ActorContext);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TActorCreateFormValues>({
		resolver: zodResolver(actorCreateFormSchema),
	});

	const submit: SubmitHandler<TActorCreateFormValues> = async formData => {
		await actorCreate(formData);
		reset();
		onClose();
	};

	return (
		<Modal title="Cadastrar Novo Ator" open={open} onCancel={onClose} footer={null} destroyOnClose>
			<Form layout="vertical" onFinish={handleSubmit(submit)}>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Nome"
							validateStatus={errors.name ? "error" : ""}
							help={errors.name?.message}>
							<Input {...field} placeholder="Nome completo" disabled={isSubmitting} />
						</Form.Item>
					)}
				/>

				<Controller
					name="birthDate"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Data de Nascimento"
							validateStatus={errors.birthDate ? "error" : ""}
							help={errors.birthDate?.message}>
							<DatePicker
								{...(field as any)}
								style={{ width: "100%" }}
								disabled={isSubmitting}
								onChange={(date: Date) => {
									const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
									field.onChange(formattedDate);
								}}
								value={field.value ? dayjs(field.value) : null}
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name="nationality"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Nacionalidade"
							validateStatus={errors.nationality ? "error" : ""}
							help={errors.nationality?.message}>
							<Input {...field} placeholder="Nacionalidade" disabled={isSubmitting} />
						</Form.Item>
					)}
				/>

				<Form.Item>
					<Button id="create-ator" type="primary" htmlType="submit" loading={isSubmitting} block>
						Cadastrar
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
