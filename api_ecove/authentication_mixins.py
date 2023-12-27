from rest_framework.authentication import get_authorization_header
from .authentication import ExpiringTokenAuthentication  # ¿Estás seguro de que necesitas esta importación?

class Authentication(object):
    def get_user(self, request):
        token = get_authorization_header(request).split()
        if token:
            print(token)
        return None

    def dispatch(self, request, *args, **kwargs):  # Corregir el nombre del método aquí
        user = self.get_user(request)
        return super().dispatch(request, *args, **kwargs)
