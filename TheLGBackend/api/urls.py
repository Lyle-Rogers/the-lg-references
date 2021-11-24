from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import *


urlpatterns = [
    # MISC URLS
    path('', DashboardView.as_view(), name="dashboard"),
    path('landing/', LandingPageView, name='landing'),
    path('user-list/', UserListView.as_view()),
    path('get-user/', GetUserView, name='get_user'),
    path('agreement/', AgreementView.as_view(), name="agreement"),
    path('exchange/', CurrencyView.as_view(), name="currency"),
    path('directory/', DirectoryView.as_view(), name="directory"),
    path('calendar-events/', CalendarEventView.as_view(), name="calendarEvents"),
    path('edit-user/', EditUserView),
    path('profileImage/', ProfileImageView),

    # YOI URLS
    path('YOI_Assistant/', YOI_AssistantView.as_view(), name="YOI_Assistant"),
    path('YOI_Registration/', YOI_RegistrationView.as_view(), name="YOI_Registration"),
    path('YOI_Create_Session/', CreateYOICheckoutSession.as_view()),

    # AUTH URLS
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('signup/', SignUpView, name="signup"),
    path('username_check/', UsernameCheckView, name="UsernameCheck"),
    path('forgot-password/', ForgotPasswordView, name='forgot_password'),
    path('password-reset/', ResetPasswordView, name='password_reset'),

    # ADMIN URLS
    path('admin/users/', AdminUsersView.as_view(), name="admin_users"),
    path('admin/get_users/', AdminUsersView.as_view(), name="AdminUserView"),
    path('admin/get_petition_entries/', AdminPetitionEntriesView.as_view(), name="AdminPetitionEntriesView"),
    path('adminDirectory/', AdminDirectoryView.as_view(), name="adminDirectory"),
    path('admin/', AdminPageView.as_view(), name='admin_page'),
    path('adminExchange/', AdminCurrencyView.as_view(), name="adminCurrency"),
    path('admin/YOI/', YOIAdminView.as_view()),
    
    # BLOG URLS
    path('posts/', PostsView.as_view(), name='post'),
    path('blog/', BlogView.as_view(), name='blog'),
    path('blog/id:<slug>/', BlogDetailView.as_view(), name='blog_details'),
    path('blog_public/', PublicBlogView.as_view(), name='public_blog'),

    # PETITION URLS
    path('petition/representative', RepresentativeSurveyEntryView.as_view(), name="petition"),
    path('petition/do-you-have-a-credencial', CredencialSurveyEntryView.as_view(), name="petition"),
    path('petition/are-you-voting-for-ammon', VotingForAmmonSurveyEntryView.as_view(), name="petition"),
    path('petition/', PetitionView.as_view(), name="petition"),

    # BUSINESS PAGE URLS
    path('businessPage/<slug>/', BusinessPageView.as_view(), name="businessPage"),
    path('businessPostDetails/<slug>/', BusinessPostDetailsView.as_view(), name="businessPostDetails"),
    path('businessPageAdmin/', BusinessPageAdminView.as_view(), name="businessPage"),

    # GROUP URLS
    path('groups/', GroupView.as_view(), name="Groups"),
    path('my_group/', MyGroupView.as_view(), name="MyGroup"),
    path('group_messages/<slug>', GroupMessageView.as_view(), name="GroupMessage"),

    # STRIPE URLS
    path('create-checkout-session/', CreateCheckoutSession.as_view(), name="CreateCheckoutSession"),
    path('create-customer-portal-session/', CreateCustomerPortalSession.as_view(), name="CreateCustomerPortalSession"),
    path('create-raffle-checkout-session/', CreateRaffleCheckoutSession.as_view(), name="RaffleCheckoutSession"),
    path('hooks/', StripeWebhooks.as_view(), name="StripeWebhooks"),
 
    #Classifieds
    path('myListings/', MyListingsView.as_view(), name="MyListings"),
    path('listing/items/', ListingsView.as_view(), name="Listings"),
    path('listing/vehicles/', VehicleListingsView.as_view(), name="VehicleListings"),
    path('listing/image-upload/', ListingImageUpload.as_view(), name="ImageUpload"),
    path('listing/favorites/', ClassifiedFavorites.as_view(), name="ClassifiedFavorites"),

    #Raffle
    path('raffle/', RaffleView.as_view()),

    #SendGrid URLS
    path('mail-sender/', MailSenderView, name="mail_sender"),
    
]

