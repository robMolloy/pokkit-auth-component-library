export interface MyButtonProps {
  children: React.ReactNode;
}

export const MyButton: React.FC<MyButtonProps> = (p) => {
  return <div style={{ backgroundColor: "red" }}>MyButton & {p.children}</div>;
};
