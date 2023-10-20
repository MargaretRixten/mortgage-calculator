import { ReactNode } from "react";

interface IMainLayoutParams {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export const MainLayout = ({ children, header, footer }: IMainLayoutParams) => {
  return (
    <>
      {header}
      <main className="bg-baseBg h-screen ">{children}</main>
      <div className="text-orange-500"></div>
      {footer}
    </>
  );
};
