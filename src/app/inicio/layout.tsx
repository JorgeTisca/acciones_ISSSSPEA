'use server'
import { Inicio } from '@/components/inicio/inicio';
import { MenuBar } from '@/components/inicio/menu/menuBar';
import { Logout } from '@/components/login/logout';



type Props = {
  children: React.ReactNode;
  params: { organicas: string }
}


export default async function inicioLayout({ children }: Props) {

  return (
    <>
      <div className="flex  h-screen " >
        <div className=' bg-card text-card-foreground  shadow-black  hover:shadow-2xl  px-4  fixed flex-none w-[13%] h-full   animate-fade-right duration-300'>
          <div className='p-1 '>


            ISSSSPENET

            <Inicio />
          </div>

          <ul className='p-2 '>
            <li className='_sidebar_button transition ease-in-out delay-50' >
              <MenuBar></MenuBar>
              {/* <Link href={`/inicio/empleados`} prefetch={true}>NUEVAS SOLICITUDES</Link> */}
            </li>

            {/* <li className='_sidebar_button transition ease-in-out delay-50' >
              <Link href={`/${organicas}/inicio/adeudos`} prefetch={true}>ADEUDOS</Link>
            </li>
            <li className='_sidebar_button transition ease-in-out delay-50' >
              ISSSSPENET
            </li> */}

          </ul>
        </div>
        <div className='w-[13%]'></div>
        <div className='flex-none w-[87%]'>
          <div className=' bg-card text-card-foreground  z-50 fixed w-[87%]  transition-all duration-500  hover:shadow-md hover:shadow-[--gray]'>
            <div className='text-black font-bold flex h-[4%] justify-between pt-2  animate-fade-down bg-white'>
              <div></div>
              <div>MENU</div>
              <div className='flex justify-between align-bottom mb-2 mr-2'>
                <Logout />
                {/* <ThemeMode /> */}
              </div>
            </div>
          </div>

          <div className="p-4  h-[95%] pt-12 bg-neutral-200" >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

