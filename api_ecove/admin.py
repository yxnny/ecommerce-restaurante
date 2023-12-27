from django.contrib import admin
from .models import categorias, productos

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, Tienda, horarios,Metodop, Orden, DetalleOrden


class UserAdmin(BaseUserAdmin):
	fieldsets = (
		(None, {'fields': ('username', 'password')}),
		('Personal info', {'fields': ('usu_nombre', 'usu_apellido', 'usu_numdoc',
			'usu_fechanacimiento', 'usu_telefono', 'usu_metododepago', 'usu_ubicacion' , 'role')}),
		('Permissions', {'fields': ('is_active',
			'is_staff', 'is_superuser', 'is_tienda')}),
		('Important dates', {'fields': ('last_login', 'usu_fecharegistro')}),
	)
	list_display = ('username', 'usu_nombre', 'usu_apellido','is_staff', 'is_superuser', 'is_tienda')
	list_filter = ('is_staff', 'is_superuser', 'is_tienda')
	search_fields = ('username', 'usu_nombre', 'usu_apellido')
	ordering = ('username',)
	exclude = ('updated_at',)
	readonly_fields = ('usu_fecharegistro',)

	def save_model(self, request, obj, form, change):
			# Personaliza la lógica de guardado del modelo si es necesario
			super().save_model(request, obj, form, change)

			# Asigna el rol de tienda si el usuario es de tipo tienda
			if obj.is_tienda:
					tienda_role = Role.objects.get(name='tienda')
					obj.role = tienda_role
					obj.save()


admin.site.register(User, UserAdmin)
admin.site.register(Role)
admin.site.register(Tienda)


admin.site.register(categorias)
admin.site.register(productos)
admin.site.register(horarios)
admin.site.register(Metodop)
admin.site.register(Orden)
admin.site.register(DetalleOrden)



