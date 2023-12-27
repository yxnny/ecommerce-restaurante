from rest_framework import serializers
from .models import categorias, productos, User, Role, Tienda, horarios, Metodop, Orden, DetalleOrden
from django.contrib.auth.hashers import make_password

# monda usuario registro


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

# Crea usuarios


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # Para que el campo de contraseña no sea incluido en las respuestas
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        is_superuser = validated_data.pop('is_superuser', False)

        user = super().create(validated_data)

        if password:
            user.set_password(password)

        if is_superuser:
            user.is_staff = True
            user.is_superuser = True

        # Si el usuario es de tipo tienda, asigna el rol correspondiente
        if user.is_tienda:
            tienda_role = Role.objects.get(name='tienda')
            user.role = tienda_role

        user.save()

        return user

# actualiza usuarios rol tienda solo el campo .


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'usu_nombre', 'username'

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance

# actualiza usuarios rol tienda solo el campo .


class UserClienteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'usu_nombre', 'username', 'usu_numdoc', 'usu_fechanacimiento', 'usu_telefono', 'usu_ubicacion'

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance


class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

# Relacion con el usuario tienda


class TiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tienda
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = categorias
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = productos
        fields = '__all__'


class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = horarios
        fields = '__all__'


class MetodopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metodop
        fields = '__all__'


class OrdenSerializer(serializers.ModelSerializer):
    metodo_pago = serializers.SerializerMethodField()

    class Meta:
        model = Orden
        fields = '__all__'


    def get_metodo_pago(self, obj):
        # Obtener los datos del método de pago asociado
        metodo_pago = obj.metodo_pago
        if metodo_pago:
            return {
                'met_titular': metodo_pago.met_titular,
                'met_numero': metodo_pago.met_numero,
                'met_fechaexpira': metodo_pago.met_fechaexpira,
                'met_cvv': metodo_pago.met_cvv,
                'met_fechacreacion': metodo_pago.met_fechacreacion,
            }
        return None
    


class DetalleOrdenDetalleSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()
    productos = serializers.SerializerMethodField()
    metodo_pago = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()  # Agrega este campo

    class Meta:
        model = DetalleOrden
        fields = '__all__'

    def get_usuario(self, obj):
        # Obtener el cliente que realizó la orden
        cliente_que_realizo_la_orden = obj.orden.usuario

        # Obtener la tienda desde la orden y luego obtener el propietario de la tienda
        tienda = obj.orden.tienda
        propietario_tienda = tienda.owner

        # Devolver los datos del cliente y del propietario de la tienda
        return {
            'cliente': {
                'username': cliente_que_realizo_la_orden.username,
                'usu_nombre': cliente_que_realizo_la_orden.usu_nombre,
                'direccion': cliente_que_realizo_la_orden.usu_ubicacion,
                'contacto': cliente_que_realizo_la_orden.usu_telefono,
                # Agrega más campos del cliente según sea necesario
            },
            'propietario_tienda': {
                'usu_nombre': propietario_tienda.usu_nombre,
                # Agrega más campos del propietario de la tienda según sea necesario
            },

        }

    def get_productos(self, obj):
        # Mantén la lógica actual para obtener datos de productos
        return [
            {
                'pro_id': detalle.producto.pro_id,
                'nombre': detalle.producto.pro_nombre,
                'cantidad': detalle.cantidad,
                'precio': detalle.precio,
                # Incluye directamente la URL completa si ya la tienes
                'pro_foto': self.get_pro_foto_url(detalle.producto.pro_foto),
            }
            for detalle in DetalleOrden.objects.filter(orden=obj.orden)
        ]

    def get_total(self, obj):
        # Obtener el total de la orden si existe, de lo contrario, devolver None
        return obj.orden.total if obj.orden else None


    def get_pro_foto_url(self, pro_foto):
        # Si pro_foto es None, devuelve None
        if not pro_foto:
            return None

        # Obtén la URL completa de la imagen utilizando la configuración de Django
        return self.context['request'].build_absolute_uri(pro_foto.url)

    def get_metodo_pago(self, obj):
        orden = obj.orden
        if orden.metodo_pago:
            metodo_pago = orden.metodo_pago
            return {
                'met_titular': metodo_pago.met_titular,
                'met_numero': metodo_pago.met_numero,
                'met_fechaexpira': metodo_pago.met_fechaexpira,
                'met_cvv': metodo_pago.met_cvv,
                'met_fechacreacion': metodo_pago.met_fechacreacion,
            }
        return None
