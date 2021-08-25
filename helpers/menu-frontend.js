const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Comprar', url: 'regalar' },
                { titulo: 'Recibir en Casa', url: 'grafica1' },
                { titulo: 'Mis Compras', url: 'misCompras' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                // { titulo: 'Comercios', url: 'comercios' },
                // { titulo: 'Transacciones', url: 'transacciones' },
                // { titulo: 'Solicitudes', url: 'solicitudes' },
                // { titulo: 'Reportes', url: 'reportes' },
            ]
        },
    ];
    if (role === "ADMIN_ROLE") {

        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
        menu[1].submenu.unshift({ titulo: 'Comercios', url: 'comercios' });
        menu[1].submenu.unshift({ titulo: 'Transacciones', url: 'transacciones' });
        menu[1].submenu.unshift({ titulo: 'Solicitud de Comercio', url: 'solicitudes' });
        menu[1].submenu.unshift({ titulo: 'Reportes', url: 'reportes' });
        menu[1].submenu.unshift({ titulo: 'Solicitud de Envio', url: 'envio' });
    }
    return menu;
}
module.exports = {
    getMenuFrontEnd
}