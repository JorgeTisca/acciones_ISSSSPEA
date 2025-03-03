import { LoginForm } from "@/components/login/form";

export default function Home() {

  return (
    <main className="bg-cover  bg-neutral-200 flex justify-center h-screen min-h-screen animate-fade p-4">
      <div className='flex-none w-[87%] '>
        <div className='flex justify-between mt-2 animate-fade-down'>
          <div></div>
          <div></div>
          <div className='flex justify-between align-bottom'>
            {/* <ThemeMode /> */}
          </div>
        </div>
        <div className='flex justify-center p-6 animate-fade-down'>
          {/* <Image className='object-cover mt-2' width={1024} height={1024} src={'/imgportada.jpg'} alt='portada isssspea' /> */}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
