import "antd";

declare module "antd" {
	export interface FormProps {
		children?: React.ReactNode;
		layout?: "horizontal" | "vertical";
		onFinish?: (values: any) => void;
		style?: React.CSSProperties;
	}

	export interface FormItemProps {
		children?: React.ReactNode;
		label?: React.ReactNode;
		validateStatus?: "" | "success" | "warning" | "error" | "validating";
		help?: React.ReactNode;
		placeholder?: string;
	}

	export interface AlertProps {
		message?: React.ReactNode;
		type?: "success" | "info" | "warning" | "error";
		showIcon?: boolean;
		style?: React.CSSProperties;
	}

	export interface ButtonProps {
		children?: React.ReactNode;
		style?: React.CSSProperties;
		onClick?: React.MouseEventHandler<HTMLElement>;
		icon?: React.ReactNode;
		type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
		htmlType?: "button" | "submit" | "reset";
		loading?: boolean;
		block?: boolean;
		size?: "large" | "middle" | "small";
		danger?: boolean;
		title?: string;
		id?: string;
	}

	export interface ModalProps {
		title?: ReactNode;
		open?: boolean;
		onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
		footer?: ReactNode | null;
		destroyOnClose?: boolean;
		children?: ReactNode;
	}

	export interface PopconfirmProps {
		title?: ReactNode;
		onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
		onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
		okText?: ReactNode;
		cancelText?: ReactNode;
		children?: ReactNode;
	}

	export interface InputProps {
		id?: string; // Tornando id opcional
		status?: "" | "warning" | "error";
		placeholder?: string;
		disabled?: boolean;
		onChange?: React.ChangeEventHandler<HTMLInputElement>;
		onBlur?: React.FocusEventHandler<HTMLInputElement>;
		value?: string;
		name?: string;
		ref?: React.Ref<HTMLInputElement>;
		maxLength?: number;
		inputMode?: string;
	}

	export interface InputNumberProps {
		placeholder?: string;
		style?: React.CSSProperties;
		min?: number;
		max?: number;
		value?: number;
		defaultValue?: number;
		onChange?: (value: number | null) => void;
		onBlur?: React.FocusEventHandler<HTMLInputElement>;
		disabled?: boolean;
		step?: number;
		name?: string;
		ref?: React.Ref<HTMLInputElement>;
	}

	export interface InputPasswordProps extends InputProps {
		visibilityToggle?: boolean;
	}

	export interface TextAreaProps {
		rows?: number;
		placeholder?: string;
		onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
		onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
		value?: string;
		style?: React.CSSProperties;
		disabled?: boolean;
		name?: string;
		ref?: React.Ref<HTMLTextAreaElement>;
		allowClear?: boolean;
		showCount?: boolean;
		maxLength?: number;
	}

	const Input: React.FC<InputProps> & {
		Password: React.FC<InputPasswordProps>;
		InputNumber: React.FC<InputNumberProps>;
		Group: React.FC<any>;
		Search: React.FC<any>;
		TextArea: React.FC<TextAreaProps>;
	};

	export default Input;

	export interface TagProps {
		children?: ReactNode;
		closable?: boolean;
		onClose?: (e: React.MouseEvent<HTMLElement>) => void;
		style?: React.CSSProperties;
		color?: string;
		icon?: ReactNode;
	}

	export const Tag: React.FC<TagProps> & {
		CheckableTag: React.FC<TagProps>;
	};

	export interface SelectProps {
		children?: ReactNode;
		style?: React.CSSProperties;
		placeholder?: string;
		onChange?: (value: any, option: ReactNode | ReactNode[]) => void;
		value?: any;
		defaultValue?: any;
		options?: Array<SelectOptionProps>;
	}

	export interface SelectOptionProps {
		children?: ReactNode;
		value?: any;
		disabled?: boolean;
		key?: string | number;
		className?: string;
		style?: React.CSSProperties;
		title?: string;
		label?: ReactNode;
	}

	export const Select: React.FC<SelectProps> & {
		Option: React.FC<SelectOptionProps>;
		OptGroup: React.FC<any>;
	};
}
