export default function Header() {
  return (
    <header className="bg-indigo-200 p-3">
      <div className="flex items-center justify-end gap-2">
        <div className="flex flex-col text-base font-medium">
          <h3 className="text-white">پشتیبانی آنلاین</h3>
          <p className="text-white-200">پاسخگوی سوالات شما هستیم</p>
        </div>
        <div
          className={`rounded-full border-2 bg-indigo-50 border-white w-9 h-9 relative
         before:absolute before:top-1 before:-right-1 before:border-2 before:border-white 
         before:bg-green-50 before:w-2.5 before:h-2.5 before:rounded-full
         text-indigo-700 text-center flex items-center justify-center font-normal text-base
         `}
        >
          JD
        </div>
      </div>
    </header>
  );
}
