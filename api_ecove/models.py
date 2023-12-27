from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Group, Permission

class Role(models.Model):
    name = models.CharField(max_length=10)
    state = models.BooleanField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Role'

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, role=None, **extra_fields):
        if not username:
            raise ValueError('El campo de correo electrónico debe estar configurado')
        username = self.normalize_email(username)
        user = self.model(username=username, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_tienda_user(self, username, password=None, role=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        if role and role.name == 'tienda':
            extra_fields.setdefault('is_tienda', True)

        return self.create_user(username, password, role, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(primary_key=True, max_length=40)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, blank=True, null=True)
    usu_nombre = models.CharField(max_length=30,blank=True, null=True)
    usu_apellido = models.CharField(max_length=30,null=True)
    password = models.CharField(max_length=128)
    usu_numdoc = models.PositiveBigIntegerField(null=True)
    usu_fechanacimiento = models.DateField(null=True)
    usu_fecharegistro = models.DateField(auto_now_add=True)
    usu_telefono = models.PositiveBigIntegerField(null=True)
    usu_metododepago = models.CharField(max_length=30, null=True)
    usu_ubicacion = models.CharField(max_length=30, null=True)

    state = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_tienda = models.BooleanField(default=False)  # Nuevo campo

    objects = CustomUserManager()

    # Agrega related_name para evitar conflictos
    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True)

    USERNAME_FIELD = 'username'    

    def save(self, *args, **kwargs):
        if self.role and self.role.name == 'tienda':
            self.is_tienda = True
        else:
            self.is_tienda = False
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.usu_nombre} {self.usu_apellido}"

class Tienda(models.Model):
    sed_id=models.AutoField(primary_key=True)
    sed_logo = models.ImageField(upload_to='logo/', null=True, blank=True)
    sed_banner = models.ImageField(upload_to='banner/', null=True, blank=True)
    sed_emailtienda = models.CharField(max_length=30, unique=True,blank=True)
    sed_teltienda = models.CharField(max_length=10,null=True,blank=True)
    sed_ubicacion = models.CharField(max_length=30, null=True,blank=True)

    sed_nomdueno = models.CharField(max_length=30, null=True,blank=True)
    sed_apedueno = models.CharField(max_length=30, null=True,blank=True)
    sed_teldueno = models.CharField(max_length=10, null=True,blank=True)
    sed_docdueno = models.CharField(max_length=10,null=True,blank=True)
    sed_emaildueno = models.CharField(max_length=30, null=True,blank=True)

    sed_banco = models.CharField(max_length=30, choices=[('Bancolombia', 'Bancolombia'), ('Avevillas', 'Avevillas')], default=None, null=True)
    sed_tipcuenta = models.CharField(max_length=30, choices=[('ahorro', 'ahorro'), ('corriente', 'corriente')], default=None, null=True)
    sed_nomtitular = models.CharField(max_length=30, null=True,blank=True)
    sed_numcuentabancaria = models.CharField(max_length=20,null=True,blank=True)
    sed_Nit = models.CharField(max_length=9, null=True,blank=True)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='tiendas')

    def __str__(self):
        return self.sed_emailtienda


class categorias(models.Model):
    cate_id = models.AutoField(primary_key=True)
    cate_nom = models.CharField(max_length=30)
    sed_id = models.ForeignKey(Tienda, on_delete=models.CASCADE, related_name='categorias')  # Agrega related_name para facilitar el acceso desde la tienda

    def __str__(self):
        return self.cate_nom



class productos(models.Model):
    pro_id = models.AutoField(primary_key=True)
    sed_id = models.ForeignKey(Tienda, on_delete=models.CASCADE, related_name='productos')  # Agrega related_name para facilitar el acceso desde la tienda
    cate_id = models.ForeignKey(categorias, on_delete=models.CASCADE, related_name='productos')  # Agrega related_name para facilitar el acceso desde la categoría
    pro_nombre = models.CharField(max_length=30)
    pro_especificacion = models.TextField(max_length=200)
    pro_foto = models.ImageField(upload_to='productos/', null=True, blank=True)

    pro_precio = models.IntegerField()
    pro_tipo = models.CharField(max_length=20, choices=[('vegetariano', 'vegetariano'), ('vegano', 'vegano'), ('vegano y vegetariano', 'vegano y vegetariano')], default=None)

    def __str__(self):
        return self.pro_nombre

class horarios(models.Model):
    h_id=models.AutoField(primary_key=True)
    sed_id = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    hlun_aper1=models.TimeField()
    hlun_cie1=models.TimeField()
    hlun_aper2=models.TimeField(null=True)
    hlun_cie2=models.TimeField(null=True)
    hmar_aper1=models.TimeField()
    hmar_cie1=models.TimeField()
    hmar_aper2=models.TimeField(null=True)
    hmar_cie2=models.TimeField(null=True)
    hmie_aper1=models.TimeField()
    hmie_cie1=models.TimeField()
    hmie_aper2=models.TimeField(null=True)
    hmie_cie2=models.TimeField(null=True)
    hjue_aper1=models.TimeField()
    hjue_cie1=models.TimeField()
    hjue_aper2=models.TimeField(null=True)
    hjue_cie2=models.TimeField(null=True)
    hvie_aper1=models.TimeField()
    hvie_cie1=models.TimeField()
    hvie_aper2=models.TimeField(null=True)
    hvie_cie2=models.TimeField(null=True)
    hsab_aper1=models.TimeField()
    hsab_cie1=models.TimeField()
    hsab_aper2=models.TimeField(null=True)
    hsab_cie2=models.TimeField(null=True)
    hdom_aper1=models.TimeField()
    hdom_cie1=models.TimeField()
    hdom_aper2=models.TimeField(null=True)
    hdom_cie2=models.TimeField(null=True)

    def __str__(self):
        return f"Horarios #{self.h_id}"

class Metodop(models.Model):
    met_id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User,on_delete=models.CASCADE)
    met_titular = models.CharField(max_length=50)
    met_numero = models.PositiveBigIntegerField(unique=True)
    met_fechaexpira = models.DateField()
    met_cvv = models.PositiveBigIntegerField()
    met_fechacreacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.met_titular

class Orden(models.Model):
    ord_id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, related_name='ordenes_realizadas', on_delete=models.CASCADE)
    tienda = models.ForeignKey(Tienda, related_name='ordenes', on_delete=models.CASCADE)
    productos = models.ManyToManyField(productos, through='DetalleOrden')
    total = models.IntegerField(null=True, blank=True)  
    fecha = models.DateField(auto_now_add=True)
    direccion_envio = models.CharField(max_length=255, null=True, blank=True)
    metodo_pago = models.ForeignKey(Metodop, null=True, blank=True, on_delete=models.SET_NULL)  # Nuevo campo

    def __str__(self):
        return str(self.ord_id)
    
class DetalleOrden(models.Model):
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE)
    producto = models.ForeignKey(productos, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    tienda_id  = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    precio = models.IntegerField()  
