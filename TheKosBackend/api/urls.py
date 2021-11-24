from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', DashboardView.as_view(), name="dashboard"),
    path('signup/', SignUpView, name="signup"),
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('forgot-password/', ForgotPasswordView, name='forgot_password'),
    path('password-reset/', ResetPasswordView, name='password_reset'),
    path('get-user/', GetUserView.as_view(), name='get_user'),
    path('update-user/', UpdateUserView.as_view(), name="update_user"),
    path('stripe/', Stripe.as_view(), name='stripe'),
    path('submitted-challenges/', UserChallengeSubmissions, name="userChallengeSubmissions"),
    path('test/', Test.as_view(), name='test'),
    path('admin/', Admin.as_view(), name='admin'),
    path('checkIn/', CheckInView.as_view(), name="checkIn"),
    path('checkIn/Details/', CheckInDetails.as_view(), name="checkInDetails"),
    path('admin/challengeSubmissions/', ChallengeSubmissionAdmin.as_view(), name="challengeSubmissionAdmin"),
    path('admin/challengeAdmin/', ChallengeAdmin.as_view(), name="challengeAdmin"),

]