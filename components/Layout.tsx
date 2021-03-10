export const Layout = ({ children }: { children: any }): JSX.Element => {
  return (
    <div className="pt-20 bg-gray-100">
      <main className="block">{children}</main>
    </div>
  )
}
