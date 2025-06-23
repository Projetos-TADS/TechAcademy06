import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MovieContext } from "../../providers/MovieContext";
import { movieCreateFormSchema, TMovieCreateFormValues } from "./movieCreateFormSchema";

interface CreateNewMovieFormProps {
	open: boolean;
	onClose: () => void;
}

export const CreateNewMovieForm = ({ open, onClose }: CreateNewMovieFormProps) => {
	const { movieCreate } = useContext(MovieContext);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TMovieCreateFormValues>({
		resolver: zodResolver(movieCreateFormSchema),
	});

	const submit: SubmitHandler<TMovieCreateFormValues> = async formData => {
		await movieCreate(formData);
		reset();
		onClose();
	};

	return (
		<Modal
			title="Criar Novo Filme"
			open={open}
			onCancel={onClose}
			footer={null}
			destroyOnClose
			width={800}>
			<Form layout="vertical" onFinish={handleSubmit(submit)}>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Título"
							validateStatus={errors.title ? "error" : ""}
							help={errors.title?.message}>
							<Input {...field} placeholder="Título do filme" disabled={isSubmitting} />
						</Form.Item>
					)}
				/>

				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Descrição"
							validateStatus={errors.description ? "error" : ""}
							help={errors.description?.message}>
							<TextArea
								{...field}
								rows={4}
								placeholder="Descrição do filme"
								disabled={isSubmitting}
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name="releaseYear"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Ano de Lançamento"
							validateStatus={errors.releaseYear ? "error" : ""}
							help={errors.releaseYear?.message}>
							<InputNumber
								{...field}
								min={1900}
								max={new Date().getFullYear()}
								style={{ width: "100%" }}
								disabled={isSubmitting}
								onChange={(value: number) => field.onChange(value)}
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name="duration"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Duração (minutos)"
							validateStatus={errors.duration ? "error" : ""}
							help={errors.duration?.message}>
							<InputNumber
								{...field}
								min={1}
								style={{ width: "100%" }}
								disabled={isSubmitting}
								onChange={(value: number) => field.onChange(value)}
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name="rating"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="Avaliação (0-5)"
							validateStatus={errors.rating ? "error" : ""}
							help={errors.rating?.message}>
							<InputNumber
								{...field}
								min={0}
								max={5}
								step={0.1}
								style={{ width: "100%" }}
								disabled={isSubmitting}
								onChange={(value: number) => field.onChange(value)}
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name="urlImage"
					control={control}
					render={({ field }) => (
						<Form.Item
							label="URL da Imagem"
							validateStatus={errors.urlImage ? "error" : ""}
							help={errors.urlImage?.message}>
							<Input {...field} placeholder="URL da imagem do filme" disabled={isSubmitting} />
						</Form.Item>
					)}
				/>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={isSubmitting} block>
						Cadastrar Filme
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
