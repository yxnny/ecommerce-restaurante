from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from api_ecove import views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r"categoria", views.CategoriaView, "categoria")
router.register(r"producto", views.ProductoView, "producto")
router.register(r"horario", views.HorarioView, "horario")
router.register(r"metodop",views.MetodopView, "metodop")

urlpatterns = [
     path("api/", include(router.urls)),
     # Total de categorias por sede
     path('TotalCategoriaPorSed/<int:sed_id>/', views.TotalCategoriasPorSed.as_view(), name='categoria-list'),
     # Total de de productos por sede
     path('TotalProductosPorSed/<int:sed_id>/', views.TotalProductosPorSed.as_view(), name='categoria-list'),
     # Ver todas las categorias por la sede
     path('categoriaPorSed/<int:sed_id>/', views.CategoriaPorSedView.as_view(), name='categoria-list'),
     # Ver todos los productos por una sede
     path('productosPorSed/<int:sed_id>/', views.ProductosPorSedView.as_view(), name='productos-list'),
     #Tienas con sus productos
     path('tiendasConProductos/', views.TiendasConProductosView.as_view(), name='tiendas-con-productos'),

     # Productos por categoria
     path('api/categoria/<int:categoria_id>/productos/',views.ProductosPorCategoriaView.as_view(), name='productos-por-categoria'),
     path('docs/', include_docs_urls(title='Ecove API')),
     path('api/login/', views.Login.as_view(), name='login'),
     path('api/logout/', views.Logout.as_view(), name='logout'),
     # Registra ambos usuarios
     path('api/register/', views.UserRegistrationView.as_view(),name='user-register'),

     # Para que el cliente haga una orden 
     path('crear_orden/', views.CrearOrden.as_view(), name='crear_orden'),
     # Para que el ver las ordenes con detalle por sed
     path('ordenes_sede/<int:sed_id>/', views.TodosLosDetalleOrdenesPorSedView.as_view(), name='orden-list_sede'),
      path('detalles-usuario/<str:username>/', views.DetallesUsuarioView.as_view(), name='detalles-usuario'),

     # Para que el ver las ordenes 
     path('ordenes/', views.ListarOrden.as_view(), name='orden-list'),
     # Total de odenes por sede
     path('TotalOrden/<int:sed_id>/', views.TotalOrdenesPorSed.as_view(), name='Ordenes_por_sede'),
     path('ProductosConTotalOrdenes/<int:sed_id>/', views.ProductosConTotalOrdenes.as_view(), name='Ordenes_por_sede'),
     path('detalle_orden/<int:orden__ord_id>/', views.DetalleOrdenPorOrdenIdView.as_view(), name='detalle_orden_detalle'),
     # Para editar el usuario cliente por el username
     path('editarUsuariosCliente/<str:username>/', views.UserClienteUpdateView.as_view(), name='update-usuario-por-email'),
     # Para listar los metodos por el username 
     path('Metodo-por-owner/<str:username>/',views.MetodoClientePorOwnerView.as_view(), name='Usuario-por-owner'),

     # Para editar el usuario tienda por el username
     path('editarUsuarios/<str:username>/', views.UpdateUsuarioView.as_view(), name='update-usuario'),
     # Para inactivar usuarios
     path('desactivar-usuario/<str:username>/', views.DesactivarUsuarioView.as_view(), name='desactivar-usuario'),

     path('api/roles/', views.RoleView.as_view(),name='roles'),  # Agrega esta línea
     # Para ver todos los usuarios
     path('users/', views.UserListView.as_view(), name='user-list'),

     # Para ver usuario cliente
     path('clientes/', views.ClienteListView.as_view(), name='cliente-list'),
     # TIENDA 
     # Para ver  usuario clientes tienda el cual tiene rol 2
     path('usuarioTiendas/', views.UsuarioTiendasListView.as_view(),name='UsuariosTiendas-list'),
     # Para ver las tiendas registradas
     path('tiendasRegistradas/', views.TiendaListView.as_view(),name='Registradas-list'),
     # Para crear la tienda
     path('crearTienda/', views.TiendaListCreateView.as_view(),name='tiendas-por-owner'),
     # Para editar la tienda del owner
     path('tienda/<int:pk>/', views.TiendaRetrieveUpdateView.as_view(),name='tienda-retrieve-update'),
     # Para ver la tienda por su dueño
     path('tiendas-por-owner/<str:username>/',views.TiendaPorOwnerView.as_view(), name='tiendas-por-owner'),
     # Horarios
     path('horariosPorSed/<int:sed_id>/',views.HorarioPorSedView.as_view(), name='Horarios-por-sed'),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
