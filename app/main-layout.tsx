import NavBarTop from "@/components/NavBarTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarTop />
      {children}
    </>
  );
}
