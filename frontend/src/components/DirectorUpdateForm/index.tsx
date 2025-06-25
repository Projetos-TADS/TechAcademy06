import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Modal, DatePicker } from "antd";
import dayjs from "dayjs";
import { DirectorContext, IDirector } from "../../providers/DirectorContext";
import { directorUpdateFormSchema, TDirectorUpdateFormValues } from "./directorUpdateFormSchema";

interface DirectorUpdateFormProps {
	director: IDirector;
	open: boolean;
	onClose: () => void;
}

export const DirectorUpdateForm = ({ director, open, onClose }: DirectorUpdateFormProps) => {
	const { directorUpdate } = useContext(DirectorContext);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TDirectorUpdateFormValues>({
		resolver: zodResolver(directorUpdateFormSchema),
		defaultValues: {
			name: director.name,
			birthDate: dayjs(director.birthDate).toString(),
			nationality: director.nationality,
		},
	});

	const submit: SubmitHandler<TDirectorUpdateFormValues> = async formData => {
		const filteredData = Object.fromEntries(
			Object.entries(formData).filter(([, value]) => value !== undefined && value !== "")
		);

		if (Object.keys(filteredData).length > 0) {
			await directorUpdate({ ...filteredData }, director.directorId);
		}
		onClose();
	};

	return (
		<Modal title="Editar Diretor" open={open} onCancel={onClose} footer={null} destroyOnClose>
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
					<Button id="edit-diretor" type="primary" htmlType="submit" loading={isSubmitting} block>
						Salvar
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
