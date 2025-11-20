import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { MovieContext } from "../../providers/MovieContext";
import { movieCreateFormSchema, TMovieCreateFormValues } from "./movieCreateFormSchema";
import type { UploadFile } from "antd/es/upload/interface";

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
    defaultValues: {
      images: [],
    },
  });

  const submit: SubmitHandler<TMovieCreateFormValues> = async (formData) => {
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
      width={800}
    >
      <Form layout="vertical" onFinish={handleSubmit(submit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Título"
              validateStatus={errors.title ? "error" : ""}
              help={errors.title?.message}
            >
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
              help={errors.description?.message}
            >
              <TextArea
                {...field}
                rows={4}
                placeholder="Descrição do filme"
                disabled={isSubmitting}
              />
            </Form.Item>
          )}
        />

        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: 1 }}>
            <Controller
              name="releaseYear"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Ano"
                  validateStatus={errors.releaseYear ? "error" : ""}
                  help={errors.releaseYear?.message}
                >
                  <InputNumber
                    {...field}
                    min={1900}
                    max={new Date().getFullYear()}
                    style={{ width: "100%" }}
                    disabled={isSubmitting}
                    onChange={(value) => field.onChange(value)}
                  />
                </Form.Item>
              )}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Duração (min)"
                  validateStatus={errors.duration ? "error" : ""}
                  help={errors.duration?.message}
                >
                  <InputNumber
                    {...field}
                    min={1}
                    style={{ width: "100%" }}
                    disabled={isSubmitting}
                    onChange={(value) => field.onChange(value)}
                  />
                </Form.Item>
              )}
            />
          </div>

          <div style={{ flex: 1 }}>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Avaliação"
                  validateStatus={errors.rating ? "error" : ""}
                  help={errors.rating?.message}
                >
                  <InputNumber
                    {...field}
                    min={0}
                    max={5}
                    step={0.1}
                    style={{ width: "100%" }}
                    disabled={isSubmitting}
                    onChange={(value) => field.onChange(value)}
                  />
                </Form.Item>
              )}
            />
          </div>
        </div>

        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Form.Item
              label="Imagens do Filme (Máx 5)"
              validateStatus={errors.images ? "error" : ""}
              help={errors.images?.message as string}
            >
              <Upload
                name="images"
                listType="picture"
                multiple
                maxCount={5}
                beforeUpload={() => false}
                accept=".jpg,.jpeg,.png"
                fileList={(value as UploadFile[]) || []}
                onChange={({ fileList }) => onChange(fileList)}
              >
                <Button icon={<UploadOutlined />}>Selecionar Imagens</Button>
              </Upload>
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
