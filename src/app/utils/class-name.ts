export const initClassName = (name: string) => (element: string) =>
	element ? `${name}__${element}` : name;
