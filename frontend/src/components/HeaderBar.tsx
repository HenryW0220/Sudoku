export function HeaderBar({ user, onLogout }: any) {
  return (
    <div className=" fixed w-screen h-22 flex items-center justify-between bg-white border-b px-5 py-2">
      <div>Psudoku</div>
      <div className="flex items-center gap-4">
        <span>{user?.username}</span>
        <span className=" cursor-pointer" onClick={onLogout}>
          Logout
        </span>
      </div>
    </div>
  );
}
