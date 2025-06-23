import { useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Result from "antd/es/result";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import { UserContext } from "../../providers/UserContext";

const { Text } = Typography;

export const NotFound = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const handleReturn = () => {
		navigate(user ? "/movies" : "/");
	};

	return (
		<Result
			status="404"
			title="Página não encontrada"
			subTitle={
				<>
					<Text type="secondary">Desculpe, a página que você visitou não existe.</Text>
					<br />
					<Text keyboard>Erro 404</Text>
				</>
			}
			extra={
				<Space>
					<Button type="primary" icon={<HomeOutlined />} onClick={handleReturn}>
						{user ? "Página Inicial" : "Ir para login"}
					</Button>
				</Space>
			}
		/>
	);
};
