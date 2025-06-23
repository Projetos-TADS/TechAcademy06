import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IMovie, MovieContext } from "../../providers/MovieContext";
import { movieUpdateFormSchema, TMovieUpdateFormValues } from "./movieupdateFormSchema";

interface MovieUpdateFormProps {
	movie: IMovie;
	onClose: () => void;
	visible: boolean;
}

export const MovieUpdateForm = ({ movie, onClose, visible }: MovieUpdateFormProps) => {
	const { movieUpdate } = useContext(MovieContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TMovieUpdateFormValues>({
		resolver: zodResolver(movieUpdateFormSchema),
		defaultValues: {
			title: movie.title,
			description: movie.description,
			releaseYear: movie.releaseYear,
			duration: movie.duration,
			rating: movie.rating,
			urlImage: movie.urlImage,
		},
	});

	const submit: SubmitHandler<TMovieUpdateFormValues> = newMovieData => {
		const filteredData = Object.fromEntries(
			Object.entries(newMovieData).filter(([, value]) => value !== undefined && value !== "")
		);

		if (Object.keys(filteredData).length > 0) {
			movieUpdate(filteredData, movie.movieId);
		}
		onClose();
	};

	return (
		<Modal
			title="Editar Filme"
			open={visible}
			onCancel={() => {
				reset();
				onClose();
			}}
			footer={[
				<Button key="back" onClick={onClose}>
					Cancelar
				</Button>,
				<Button key="submit" type="primary" onClick={handleSubmit(submit)}>
					Atualizar
				</Button>,
			]}
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
							<Input {...field} placeholder="Título do filme" />
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
							<TextArea {...field} rows={4} placeholder="Descrição do filme" />
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
							<Input {...field} placeholder="URL da imagem do filme" />
						</Form.Item>
					)}
				/>
			</Form>
		</Modal>
	);
};
