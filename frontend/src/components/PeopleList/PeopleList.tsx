import { Button } from "antd";
import Card from "antd/es/card";
import Grid from "antd/es/grid";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

const { useBreakpoint } = Grid;
const { Text } = Typography;

interface Person {
	id: string;
	name: string;
	birthDate?: string;
	nationality?: string;
}

interface PeopleListProps {
	title: string;
	people: Person[];
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	onCreate: () => void;
}

export const PeopleList = ({ title, people, onEdit, onDelete, onCreate }: PeopleListProps) => {
	const screens = useBreakpoint();

	const formatarData = (dataString: string): string => {
		const [ano, mes, dia] = dataString.split("-");
		return `${dia}/${mes}/${ano}`;
	};

	const titleLower = title.toLowerCase();

	return (
		<div style={{ padding: "1.5rem", marginTop: "1rem" }}>
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
				<h1
					style={{
						fontSize: "1.75rem",
						fontFamily: "var(--font-logo)",
						textAlign: "center",
						margin: 0,
					}}>
					{`LISTA DE ${title}ES`}
				</h1>
				<Button
					id={`new-${titleLower}`}
					type="primary"
					icon={<PlusOutlined />}
					onClick={onCreate}
					title={`Novo ${titleLower}`}
				/>
			</div>
			<div
				id={`${titleLower}-list`}
				style={{
					display: "grid",
					gridTemplateColumns: screens.lg
						? "repeat(4, 1fr)"
						: screens.md
						? "repeat(2, 1fr)"
						: "1fr",
					gap: "1rem",
					padding: "1.5rem",
				}}>
				{people?.map(person => (
					<Card
						key={person.id}
						title={person.name}
						actions={[
							<Button
								icon={<EditOutlined />}
								id={`edit-${titleLower}`}
								onClick={() => onEdit(person.id)}
							/>,
							<Popconfirm
								title={`Tem certeza que deseja excluir este ${titleLower}?`}
								onConfirm={() => onDelete(person.id)}
								okText="Sim"
								cancelText="Não">
								<Button icon={<DeleteOutlined />} id={`delete-${titleLower}`} danger />
							</Popconfirm>,
						]}>
						<Space direction="vertical">
							{person.birthDate && <Text>Nascimento: {formatarData(person.birthDate)}</Text>}
							{person.nationality && <Text>Nacionalidade: {person.nationality}</Text>}
						</Space>
					</Card>
				))}
			</div>
		</div>
	);
};
