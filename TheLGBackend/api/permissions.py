from rest_framework.permissions import BasePermission

class IsAdminPermission(BasePermission):
    message = "Only admins are permitted on this page."

    def has_permission(self, request, view):
        return bool(request.user.profile.role == 3)
        