
export const Logout = () => {
    return (

        <form
            action={async () => {
                "use server"

            }}
        >
            <button className='_nav_button ' >CERRAR SESIÓN</button >
        </form>
    )
}
