
export default function Page() {
  return (
    <>
      <div className="flex px-4 py-2 items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </> 
  );
}
