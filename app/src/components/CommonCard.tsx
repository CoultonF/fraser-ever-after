export const CommonCard = ({ children }: React.PropsWithChildren) => (
  <div className="flex w-full mx-0 overflow-hidden my-6 rounded-mg border border-gray-400 bg-white shadow sm:rounded-lg">
    <div className="w-full m-0 px-5 py-6 sm:p-8">{children}</div>
  </div>
);
