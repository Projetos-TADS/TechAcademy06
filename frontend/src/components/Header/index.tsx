import { useContext, useState } from "react";
import { Button, Modal, Popconfirm, message } from "antd";
import { LogoutOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Layout from "antd/es/layout";
import Typography from "antd/es/typography";
import Space from "antd/es/space";
import { UserContext } from "../../providers/UserContext";
import { UserEditForm } from "../UserUpdateForm";

const { Header } = Layout;
const { Text, Title } = Typography;

export const BlockbusterHeader = () => {
	const { userLogout, userDelete, user } = useContext(UserContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => setIsModalOpen(true);
	const handleCancel = () => setIsModalOpen(false);

	const confirmDelete = () => {
		if (user?.userId) {
			userDelete(user.userId);
			message.success("Conta excluída com sucesso");
		}
	};

	return (
		<Header
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "0 1.5rem",
				background: "linear-gradient(to right, var(--primary-color), var(--blue-3))",
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
			}}>
			<Title
				level={3}
				style={{
					fontFamily: "var(--font-logo)",
					color: "var(--secondary-color)",
					margin: 0,
					letterSpacing: "0.125rem",
					textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
					fontSize: "1.75rem",
				}}>
				BLOCKBUSTER
			</Title>

			<Space>
				<Text
					strong
					style={{
						color: "var(--secondary-color)",
						fontSize: "1.125rem",
						textTransform: "capitalize",
					}}>
					{user?.name}
				</Text>

				<Button icon={<EditOutlined />} onClick={showModal} style={{ color: "inherit" }}>
					Editar
				</Button>

				<Popconfirm
					title="Tem certeza que deseja excluir sua conta?"
					onConfirm={confirmDelete}
					okText="Sim"
					cancelText="Não">
					<Button danger icon={<DeleteOutlined />}>
						Excluir
					</Button>
				</Popconfirm>

				<Button icon={<LogoutOutlined />} onClick={userLogout} style={{ color: "inherit" }}>
					Logout
				</Button>
			</Space>

			<Modal
				title="Editar Usuário"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
				destroyOnClose={true}>
				<UserEditForm onSuccess={handleCancel} />
			</Modal>
		</Header>
	);
};
