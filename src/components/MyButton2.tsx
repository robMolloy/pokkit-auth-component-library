export interface MyButton2Props {
  children: React.ReactNode;
}

export const MyButton2: React.FC<MyButton2Props> = (p) => {
  return (
    <div style={{ backgroundColor: "coral" }}>MyButton2 & {p.children}</div>
  );
};
