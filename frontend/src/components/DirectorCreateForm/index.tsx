import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Modal, DatePicker } from "antd";
import dayjs from "dayjs";
import { DirectorContext } from "../../providers/DirectorContext";
import { directorCreateFormSchema, TDirectorCreateFormValues } from "./directorCreateFormSchema";

interface CreateNewDirectorFormProps {
	open: boolean;
	onClose: () => void;
}

export const CreateNewDirectorForm = ({ open, onClose }: CreateNewDirectorFormProps) => {
	const { directorCreate } = useContext(DirectorContext);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TDirectorCreateFormValues>({
		resolver: zodResolver(directorCreateFormSchema),
	});

	const submit: SubmitHandler<TDirectorCreateFormValues> = async formData => {
		await directorCreate(formData);
		reset();
		onClose();
	};

	return (
		<Modal
			title="Cadastrar Novo Diretor"
			open={open}
			onCancel={onClose}
			footer={null}
			destroyOnClose>
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
					<Button id="create-diretor" type="primary" htmlType="submit" loading={isSubmitting} block>
						Cadastrar
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
