from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import viewsets
from datetime import datetime
from rest_framework import generics
from django.contrib.sessions.models import Session
from .serializer import DetalleOrdenDetalleSerializer, UserTokenSerializer, UserSerializer, RoleSerializer, ProductoSerializer, CategoriaSerializer, TiendaSerializer, HorarioSerializer, UserUpdateSerializer, UserClienteUpdateSerializer, MetodopSerializer, OrdenSerializer
from .models import categorias, productos, User, Role, Tienda, horarios, Metodop, Orden, DetalleOrden
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveAPIView
from django.db.models import Count

from django.shortcuts import get_object_or_404
# monda registro de usuario
User = get_user_model()


class UserListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Muetsra la lista de usuarios con el rol cliente el cual es el 1


class ClienteListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.filter(role=1)  # Ajusta según tu modelo de datos
    serializer_class = UserSerializer


class RoleView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# Registra el usuario


class UserRegistrationView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# Editar solo los campos del usuario


class UpdateUsuarioView(generics.RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserUpdateSerializer
    queryset = User.objects.all()

    def get_object(self):
        username = self.kwargs['username'].replace('-', '@')
        return get_object_or_404(User, username=username)

# Editar usuario cliente


class UserClienteUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserClienteUpdateSerializer
    queryset = User.objects.all()

    def get_object(self):
        username = self.kwargs['username'].replace('-', '@')
        return get_object_or_404(User, username=username)

# Cliente por username dueño


class MetodoClientePorOwnerView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Tienda.objects.filter(owner=username)


class DesactivarUsuarioView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, username, *args, **kwargs):
        try:
            usuario = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        usuario.is_active = False  # Desactivar la cuenta
        usuario.save()
        return Response({'message': f'Usuario {username} desactivado correctamente.'}, status=status.HTTP_200_OK)


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                # Crear o actualizar token
                token, created = Token.objects.get_or_create(user=user)

                user_role = None
                usu_nombre = None
                tienda_info = None

                if user.role:
                    user_role = user.role.name
                    usu_nombre = user.usu_nombre

                    # Obtener información de la tienda si está asociada al usuario
                    if user.is_tienda and user.tiendas.exists():
                        # Tomamos la primera tienda asociada (puedes ajustar según tu lógica)
                        tienda_info = {
                            "sed_id": user.tiendas.first().sed_id,
                            "sed_ubicacion": user.tiendas.first().sed_ubicacion,
                            "sed_logo": request.build_absolute_uri(user.tiendas.first().sed_logo.url),
                            # Agrega otros campos de la tienda según sea necesario
                        }

                return Response({
                    'token': token.key,
                    'user': UserTokenSerializer(user).data,
                    'message': 'Logged in',
                    'role': user_role,
                    'usu_nombre': usu_nombre,
                    'tienda_info': tienda_info,  # Nuevo campo para la información de la tienda
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'This user is not active.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Wrong username or password.'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            token_key = request.GET.get('token')
            token = Token.objects.filter(key=token_key).first()

            if token:
                user = token.user
                all_sessions = Session.objects.filter(
                    expire_date__gte=datetime.now())

                if all_sessions.exists():
                    for session in all_sessions:
                        session_data = session.get_decoded()
                        if user.username == session_data.get('_auth_user_id'):
                            session.delete()

                token.delete()
                return Response({'message': 'Logged out.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)


# relacion usuario tienda con categoria y producto
# Para agregar categorias
class CategoriaView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = CategoriaSerializer
    queryset = categorias.objects.all()
# Para ver todas las categorias de una tienda en especifico


class CategoriaPorSedView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategoriaSerializer

    def get_queryset(self):
        # Obtener el ID de la tienda desde la URL
        sed_id = self.kwargs['sed_id']

        # Filtrar los horarios por el ID de la tienda
        return categorias.objects.filter(sed_id=sed_id)


class TotalCategoriasPorSed(APIView):
    permission_classes = [AllowAny]

    def get(self, request, sed_id):
        total_categorias = categorias.objects.filter(sed_id=sed_id).count()
        return Response({"total_categorias": total_categorias}, status=status.HTTP_200_OK)


class ProductoView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ProductoSerializer
    queryset = productos.objects.all()

# Para ver todas los productos de una tienda en especifico


class ProductosPorSedView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductoSerializer

    def get_queryset(self):
        # Obtener el ID de la tienda desde la URL
        sed_id = self.kwargs['sed_id']

        # Filtrar los horarios por el ID de la tienda
        return productos.objects.filter(sed_id=sed_id)


class TiendasConProductosView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        tiendas_usuarios = User.objects.filter(is_tienda=True, is_active=True)
        tiendas_con_productos = []

        for tienda_usuario in tiendas_usuarios:
            tienda = Tienda.objects.filter(
                owner=tienda_usuario, owner__is_active=True).first()

            if tienda:
                productos_tiendas = productos.objects.filter(
                    sed_id=tienda.sed_id)

                tienda_data = TiendaSerializer(tienda).data
                productos_data = ProductoSerializer(
                    productos_tiendas, many=True).data

                tienda_data['sed_logo'] = request.build_absolute_uri(
                    tienda_data['sed_logo'])
                tienda_data['sed_banner'] = request.build_absolute_uri(
                    tienda_data['sed_banner'])

                for producto in productos_data:
                    producto['pro_foto'] = request.build_absolute_uri(
                        producto['pro_foto'])

                tienda_con_productos = {
                    "tienda": tienda_data,
                    "productos": productos_data,
                }
                tiendas_con_productos.append(tienda_con_productos)

        return Response(tiendas_con_productos)

# Para ver los productos de una categoria


class ProductosPorCategoriaView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductoSerializer

    def get_queryset(self):
        # Obtiene el ID de la categoría desde los parámetros de la URL
        categoria_id = self.kwargs['categoria_id']
        return productos.objects.filter(cate_id=categoria_id)


class TotalProductosPorSed(APIView):
    permission_classes = [AllowAny]

    def get(self, request, sed_id):
        total_productos = productos.objects.filter(sed_id=sed_id).count()
        return Response({"total_productos": total_productos}, status=status.HTTP_200_OK)

# Para crear el horario de la tienda


class HorarioView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = HorarioSerializer
    queryset = horarios.objects.all()


class HorarioPorSedView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = HorarioSerializer

    def get_queryset(self):
        # Obtener el ID de la tienda desde la URL
        sed_id = self.kwargs['sed_id']

        # Filtrar los horarios por el ID de la tienda
        return horarios.objects.filter(sed_id=sed_id)

# Muestra las tiendas registradas de los usuarios con rol 2


class UsuarioTiendasListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.filter(role=2)
    serializer_class = UserSerializer

# Me muestra todas las tiendas registras


class TiendaListView(ListAPIView,):
    permission_classes = [AllowAny]
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer

# crear la tienda


class TiendaListCreateView(generics.ListCreateAPIView):
    # Permitir tanto a usuarios autenticados como no autenticados
    permission_classes = []
    serializer_class = TiendaSerializer
    queryset = Tienda.objects.all()

    def perform_create(self, serializer):
        # Verifica si el usuario está autenticado
        if self.request.user.is_authenticated:
            # Si está autenticado, asigna la tienda al usuario
            tienda = serializer.save(owner=self.request.user)
            response_data = TiendaSerializer(tienda).data
            response_data['sed_id'] = tienda.sed_id
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            # Si no está autenticado, aún puedes crear la tienda sin asignar un propietario
            tienda = serializer.save()
            response_data = TiendaSerializer(tienda).data
            response_data['sed_id'] = tienda.sed_id
            return Response(response_data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        owner_data = UserSerializer(instance.owner).data
        data = {
            **serializer.data,
            'owner': owner_data,
        }
        return Response(data)

# Tienda por dueño


class TiendaPorOwnerView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = TiendaSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Tienda.objects.filter(owner=username)

# Para editar la tienda


class TiendaRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = []
    serializer_class = TiendaSerializer
    queryset = Tienda.objects.all()

# Metodo para metodos de pago


class MetodopView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = MetodopSerializer
    queryset = Metodop.objects.all()


class ListarOrden(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = OrdenSerializer
    queryset = Orden.objects.all()


class CrearOrden(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        data = request.data

        # Extraer datos de la solicitud
        username = data.get('username')
        sed_id = data.get('sed_id')
        direccion = data.get('direccion')
        metodo_pago_data = data.get('metodo_pago', {})  # Cambio aquí
        met_id = metodo_pago_data.get('met_id')  # Cambio aquí
        productos_data = data.get('productos', [])
        productos_en_orden = []  # Lista para almacenar los nombres de los productos
        total_orden = 0  # Variable para almacenar el precio total de la orden

        # Obtener el usuario, la tienda y el método de pago
        usuario = User.objects.get(username=username)
        tienda = Tienda.objects.get(sed_id=sed_id)
        metodo_pago = Metodop.objects.get(
            met_id=met_id) if met_id else None  # Cambio aquí

        # Crear la orden
        orden_data = {
            'usuario': usuario.username,  # Usar directamente el ID del usuario
            'tienda': tienda.sed_id,   # Solo necesitamos el ID de la tienda
            'direccion_envio': direccion,
            'metodo_pago': met_id if met_id else None,  # Cambio aquí
        }
        orden_serializer = OrdenSerializer(data=orden_data)

        if orden_serializer.is_valid():
            # Pasar el método de pago a la orden
            orden = orden_serializer.save(metodo_pago=metodo_pago)

            # Crear detalles de la orden
            for producto_data in productos_data:
                producto_id = producto_data.get('pro_id')
                cantidad = producto_data.get('cantidad')
                producto = productos.objects.filter(pro_id=producto_id).first()
                productos_en_orden.append(producto.pro_nombre)
                detalle_data = {
                    'orden': orden.ord_id,
                    'producto': producto.pro_id,
                    'cantidad': cantidad,
                    'tienda_id': tienda.sed_id,  # Utilizar el ID de la tienda
                    'precio': producto.pro_precio,

                    # Puedes agregar más campos según sea necesario
                }
                detalle_serializer = DetalleOrdenDetalleSerializer(
                    data=detalle_data)
                if detalle_serializer.is_valid():
                    detalle_serializer.save()
                    # Convertir a entero y luego sumar al total
                    total_orden += int(detalle_data['precio']) * cantidad
                else:
                    return Response(detalle_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Actualizar el campo total en la orden
            orden.total = total_orden
            orden.save()

            # Crear la respuesta con los nombres de los productos
            response_data = {
                'ord_id': orden.ord_id,
                'total': orden.total,
                'fecha': orden.fecha,
                'direccion_envio': orden.direccion_envio,
                'productos': productos_en_orden,
                'cliente': {
                    'username': usuario.username,
                    'usu_nombre': usuario.usu_nombre,
                    # Agrega más campos del cliente según sea necesario
                },
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(orden_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TotalOrdenesPorSed(APIView):
    permission_classes = [AllowAny]

    def get(self, request, sed_id):
        total_ordenes = Orden.objects.filter(tienda__sed_id=sed_id).count()
        return Response({"total_ordenes": total_ordenes}, status=status.HTTP_200_OK)


class TodosLosDetalleOrdenesPorSedView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = OrdenSerializer

    def get_queryset(self):
        # Obtener el ID de la tienda desde la URL
        sed_id = self.kwargs['sed_id']

        # Filtrar las órdenes por el ID de la tienda y seleccionar también los detalles
        return Orden.objects.filter(tienda=sed_id).prefetch_related('productos__detalleorden_set')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class DetallesUsuarioView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        username = kwargs.get('username')
        try:
            usuario = User.objects.get(username=username)
            # Aquí puedes agregar más campos según sea necesario
            detalles_usuario = {
                'usu_nombre': usuario.usu_nombre,
                # Agrega más campos según sea necesario
            }
            return Response(detalles_usuario, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        

class DetalleOrdenPorOrdenIdView(RetrieveAPIView):
    permission_classes = []
    queryset = DetalleOrden.objects.all()
    serializer_class = DetalleOrdenDetalleSerializer
    lookup_field = 'orden__ord_id'  # Especificar el campo de búsqueda

    def retrieve(self, request, *args, **kwargs):
        # Obtener el ID de la orden desde los parámetros de la URL
        orden_id = kwargs.get('orden__ord_id')

        # Filtrar los detalles de la orden por el ID de la orden
        detalles_orden = DetalleOrden.objects.filter(orden__ord_id=orden_id)

        # Verificar si la orden existe
        if not detalles_orden.exists():
            return Response({"detail": "La orden no existe."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(detalles_orden, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductosConTotalOrdenes(APIView):
    permission_classes = [AllowAny]

    def get(self, request, sed_id):
        try:
            productos_en_tienda = productos.objects.filter(sed_id=sed_id)
            total_ordenes_por_producto = Orden.objects.filter(
                tienda__sed_id=sed_id
            ).values('productos').annotate(total_ordenes=Count('productos'))

            productos_data = []
            for producto in productos_en_tienda:
                total_ordenes = next(
                    (item['total_ordenes']
                     for item in total_ordenes_por_producto if item['productos'] == producto.pro_id),
                    0
                )

                producto_data = {
                    'producto_id': producto.pro_id,
                    'producto_nombre': producto.pro_nombre,
                    'producto_precio': producto.pro_precio,
                    'producto_total_ordenes': total_ordenes,
                }

                productos_data.append(producto_data)

            return Response(productos_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
