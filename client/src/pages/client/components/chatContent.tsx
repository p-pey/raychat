import Dialog from "./dialog";

export default function ChatContent() {
  return (
    <main className="flex flex-col gap-2">
      <Dialog isPrimary={false}>
        ٖسلام. اگر سوالی در مورد رایچت دارید ، از ما بپرسید! 👋
      </Dialog>

      <Dialog isPrimary>
        سلام خوبین .چطور میتونم رایچت رو نصب کنم هرکاری میشه کردم ولی با ویجت
        مشکل دارم نمیوفته روی سایت !
      </Dialog>
    </main>
  );
}
