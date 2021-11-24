from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from datetime import datetime
from datetime import timedelta
from django.core.files.base import ContentFile
from django.db.models import Q
from django.conf import settings
import uuid
import json
import requests
import random
import string
import base64

from .models import (
    Token, Post, RaffleEntry, PetitionEntry, Upload, Petition, 
    AgreementSubmission, Blog, Thumbnail, Blog, 
    RepresentativeSurveyEntry, CredencialSurveyEntry, VotingForAmmonSurveyEntry,
    Currency, Directory, BusinessPage, BusinessPagePost, BusinessPagePhoto, StripeCustomer,
    YOI_Assistant, CalendarEvent, Group, GroupMessage, YOI_Registration,
    CalendarEvent, Listing, VehicleListing, ListingImage, ClassifiedFavorite, ProfileImage
    )   
    
from .serializers import (
    SignUpSerializer, UserSerializer,PostSerializer,
    PetitionEntrySerializer, PetitionEntryGETSerializer,
    AgreementSubmissionSerializer, BlogSerializer, BlogPOSTSerializer,
    CurrencySerializer, DirectorySerializer, BusinessPageSerializer,
    BusinessPagePostSerializer, StripeCustomerSerializer, CalendarEventSerializer,
    YOI_AssistantSerializer, GroupSerializer, GroupMessageSerializer, 
    GroupCreateSerializer, GroupCreateMessageSerializer, YOI_RegistrationSerializer,
    ListingSerializer, VehicleListingSerializer, RaffleEntrySerializer,
    ClassifiedFavoriteSerializer
    )

from .permissions import IsAdminPermission
from django.contrib.auth.models import User
from .utils import (
    create_stripe_payment, 
    create_error, 
    send_forgot_password_email, 
    reset_password,
    check_subscription
    )
from .pagination import SmallResultsSetPagination

import stripe

stripe.api_key = 'sk_live_voDNOPn7C52OfWHkivdYpUYF003ugiOfZ2'

from django.core.mail import send_mail

# import sendgrid

# from sendgrid.helpers.mail import (Mail, Email,Personalization)

# from python_http_client import exceptions

# from twilio_sendgrid_integration.settings import DEFAULT_FROM_EMAIL, SENDGRID_API_KEY



# auth start

@api_view(["POST",])
@permission_classes([AllowAny])
def SignUpView(request):
    if request.method == "POST":
        serializer = SignUpSerializer(data=request.data['user'])
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            profile = request.data['profile']
            user.profile.middle_name = profile['middle_name']
            user.profile.phone_number = profile['phone_number']
            user.save()
            token = Token.objects.get(user=user)
            user = UserSerializer(user)
            data['response'] = "successfully registered a new user."
            data['signedIn'] = True
            data['token'] = token.key
            data['user'] = user.data
        else:
            data['errors'] = serializer.errors
            data['signedIn'] = False
        return Response(data)

@api_view(["POST",])
@permission_classes({AllowAny})
def UsernameCheckView(request):
    username = request.data['username']
    try:
        user = User.objects.get(username=username)
        return Response({"Status": "Taken"})
    except:
        return Response({"Status": "Avaiable"})

        


@api_view(["POST",])
@permission_classes([AllowAny])
def ForgotPasswordView(request):
    send_forgot_password_email(request.data['email'])
    return Response()


@api_view(["POST",])
@permission_classes([AllowAny])
def ResetPasswordView(request):
    status = reset_password(token=request.data['token'], password=request.data['password'])
    return Response(status)
# auth end


@api_view(["GET"])
def GetUserView(request):
    if request.method == "GET":
        user = UserSerializer(request.user)
        subscriptionStatus = check_subscription(request.user)
        data = {
            'message': 'get request recieved from getuserview',
            'user': user.data,
            'subscriptionStatus': subscriptionStatus
        }

        return Response(data) 

@api_view(["PUT"])
def EditUserView(request):
    user = User.objects.get(pk=request.user.id)
    if request.data['first_name'] != None:    
        user.first_name = request.data["first_name"]
    if request.data['last_name'] != None:
        user.last_name = request.data["last_name"]
    if request.data['username'] != None:
        user.username = request.data["username"]
    if request.data['phone_number'] != None:
        user.profile.phone_number = request.data["phone_number"]
    if request.data['email'] != None:
        user.email = request.data["email"]
    user.save()
    res = {
        'message': 'user was edited',
        'user-status': user.first_name
        }
    return Response(res)

@api_view(["POST",])
# @permission_classes([AllowAny])
def ProfileImageView(request):
    user = request.user

    try:
        image_data = request.data['image']
        format, image_data = image_data.split(';base64,')
        ext = format.split('/')[-1]
        image_name = "profile_image"
        profile_image = ContentFile(base64.b64decode(image_data), name=image_name + ext)

        profile_image = ProfileImage.objects.create(
            file = profile_image
        )
        img_url = profile_image.file.url
       
        user.profile.image = img_url
        user.save()
        return Response({"success"},status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"Errors"}, status=status.HTTP_400_BAD_REQUEST)



class PostsView(APIView, PageNumberPagination):
    page_size = 10
    max_page_size = 1000

    def get_queryset(self):
        posts = Post.objects.all().order_by('-submittedOn')
        return self.paginate_queryset(posts, self.request)
    
    def get(self, request):
        posts = self.get_queryset()
        serializer = PostSerializer(posts, many=True)
        return self.get_paginated_response(serializer.data)


##### ADMIN VIEWS #####

class AdminUsersView(APIView, PageNumberPagination):
    page_size = 10
    max_page_size = 1000

    def get_queryset(self, params):
        if params:
            users = User.objects.filter( Q(username__contains=params['search']) | 
            Q(email__contains=params['search']) | Q(first_name__contains=params['search']) | Q(last_name__contains=params['search']) ).order_by('id')
        else:
            users = User.objects.all().order_by('id')
        return self.paginate_queryset(users, self.request)

    def get(self, request):
        params = request.query_params
        users = self.get_queryset(params)
        serializer = UserSerializer(users, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        json_data = json.loads(request.body)
        if json_data['post_type'] == 'CREATE': 
            try:
                user = User.objects.create_user(
                    username = json_data['username'],
                    first_name = json_data['first_name'],
                    last_name = json_data['last_name'],
                    email = json_data['email'],
                    password = json_data['password']
                )
                user.profile.role = json_data['role']
                user.profile.middle_name = json_data['middle_name']
                user.save()
                return Response({'Success': 'User Successfully Created'})
            except:
                return Response({'Error': 'Something Went Wrong'})
        elif json_data['post_type'] == 'EDIT':
            user = User.objects.get(id=json_data['id'])
            if user.username != json_data['username']:
                user.username = json_data['username']
            if user.first_name != json_data['first_name']:
                user.first_name = json_data['first_name']
            if user.last_name != json_data['last_name']:
                user.last_name == json_data['last_name']
            if user.profile.middle_name != json_data['middle_name']:
                user.profile.middle_name = json_data['middle_name']
            if user.email != json_data['email']:
                user.email = json_data['email']
            if json_data['role'] == "User":
                user.profile.role = 1
            if json_data['role'] == "Editor":
                user.profile.role = 2
            if json_data['role'] == "Admin":
                user.profile.role = 3
            try:
                user.save()
                return Response({"Success": "User Edit Successful"})
            except Exception as e:
                return Response({"Error": "Username Taken"})
        elif json_data['post_type'] == 'DELETE':
            User.objects.get(id=json_data['id']).delete()
            return Response({"Success": "User Deleted"})
        else:
            return Response({"Error": "Post Type Not Valid"})

class AdminPetitionEntriesView(APIView, PageNumberPagination):
    page_size = 10
    max_page_size = 1000

    def get_queryset(self, params):
        if params:
            petitionEntries = PetitionEntry.objects.filter( Q(name__contains=params['search']) | Q(phone_number__contains=params['search'])).order_by('id')
        else:
            petitionEntries = PetitionEntry.objects.all()
        return self.paginate_queryset(petitionEntries, self.request)

    def get(self, request):
        params = request.query_params
        petitionEntries = self.get_queryset(params)
        serializer = PetitionEntryGETSerializer(petitionEntries, many=True)
        return self.get_paginated_response(serializer.data)

class AdminPageView(APIView):

    def get(self, request):
        content = {
            "message":"Welcome "+ request.user.username,
            "users": UserSerializer(User.objects.all(), many=True).data
            }
        return Response(content)
    
    def post(self, request):
        json_data = json.loads(request.body)
        user = User.objects.get(id=json_data['id'])
        if user.profile.status == 1:
            user.profile.status = 2
        elif user.profile.status == 2:
            user.profile.status = 1
        else:
            user.profile.status = 3
        user.save()
        response = {
            'message': 'Switched user status',
            'user-status': user.profile.status
            }
        return Response(response)

class DashboardView(APIView):
    def get(self, request):
        user = UserSerializer(request.user)
        registration = RegistrationSerializer(Registration.objects.filter(user=request.user, payment_complete=True), many=True)
        content = {
            'registration': registration.data
        }
        return Response(content)

class UserListView(APIView):

    def get(self, request):
        users = UserSerializer(User.objects.all(), many=True)
        registrations = RegistrationSerializer(Registration.objects.filter(payment_complete=True), many=True)
        petitionEntries = PetitionEntryGETSerializer(PetitionEntry.objects.all(), many=True)
        agreements = AgreementSubmissionSerializer(AgreementSubmission.objects.all(), many=True)
        content = {
            "message": "User List",
            "users": users.data,
            "registrations": registrations.data,
            "petition_entries": petitionEntries.data,
            "agreementSubmissions": agreements.data,
        }
        return Response(content)


class PublicBlogView(APIView, PageNumberPagination):
    permission_classes = [AllowAny]
    page_size = 12

    def get_queryset(self):
        queryset = Blog.objects.filter(security=2, status=2).order_by('-created')
        return self.paginate_queryset(queryset, self.request)

    def get(self, request):
        posts = BlogSerializer(self.get_queryset(), many=True)
        res = {
            'Message':'Blog Get Request Recieved',
            'posts': posts.data,
        }
        return self.get_paginated_response(res)

class BlogView(APIView, PageNumberPagination):
    page_size = 12

    def get_queryset(self, params):
        try:
            queryset = Blog.objects.filter( title__contains=params['search'] ).order_by('-created')
        except:
            queryset = Blog.objects.all().order_by('-created')
        hidden = queryset.filter(~Q(createdBy=self.request.user), status=3)
        queryset = queryset.exclude(id__in=hidden)
        private = self.request.query_params.get('private', None)
        if private is not None:
            queryset = queryset.filter(status=2)
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        return self.paginate_queryset(queryset, self.request)

    def get(self, request):
        params = request.query_params
        posts = BlogSerializer(self.get_queryset(params), many=True)
        res = {
            'Message':'Blog Get Request Recieved',
            'posts': posts.data,
        }
        return self.get_paginated_response(res)

    def post(self, request):
        if request.data['thumb_nail'] != '':
            image_data = request.data['thumb_nail']
            format, image_data = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = request.data['title'] + datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
            thumb_nail = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")

            thumb_nail = Thumbnail.objects.create(
                file = thumb_nail
            )

            img_url = thumb_nail.file.url
        else:
            img_url = ""

        data = {
            'createdBy': request.user.id,
            'lastUpdatedBy': request.user.id,
            'title': request.data['title'],
            'summary': request.data['summary'],
            'thumb_nail': img_url,
            'content': request.data['content'],
            'status': int(request.data['status']),
            'security': int(request.data['security'])
        }
        post = BlogPOSTSerializer(data=data)
        if post.is_valid():
            post.save()
            res = {
                "message": "post created successfully",
                "post": post.data
            }
        else:
            res = {
                "message": "post creation unsuccessfully",
                "Errors": post.errors
            }
        return Response(res)
    
    def put(self, request):
        post = Blog.objects.get(id=request.data['id'])

        if request.data['thumb_nail'][0:6] == 'https:' or request.data['thumb_nail'] == '':
            img_url = post.thumb_nail
        else:
            image_data = request.data['thumb_nail']
            format, image_data = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image_name = request.data['title'] + datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
            thumb_nail = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")

            thumb_nail = Thumbnail.objects.create(
                file = thumb_nail
            )

            img_url = thumb_nail.file.url

        status = request.data['status']
        if status == "Draft":
            status = 1
        elif status == "Published":
            status = 2
        elif status == "Hidden":
            status = 3

        security = request.data['security']
        if security == "Private":
            security = 1
        elif security == "Public":
            security = 2
        
        data = {
            'createdBy': post.createdBy.id,
            'lastUpdatedBy': request.user.id,
            'title': request.data['title'],
            'summary': request.data['summary'],
            'thumb_nail': img_url,
            'content': request.data['content'],
            'status': status,
            'security': security
        }
        post = BlogPOSTSerializer(post, data=data)
        if post.is_valid():
            post.save()
            res = {
                "message": "post created successfully",
                "post": post.data
            }
        else:
            res = {
                "message": "post creation unsuccessfully",
                "Errors": post.errors
            }
        return Response(res)
        
    def delete(self, request):
        try:
            Blog.objects.get(id=request.data['id']).delete()
            res = {
                "status": "Success"
            }
        except:
            res = {
                "status": "Failed"
            }
        return Response(res)

class BlogDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        post = BlogSerializer(Blog.objects.get(id=slug))
        return Response(post.data)

        
class PetitionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        letters = string.ascii_lowercase
        image_data = request.data['signature']
        format, image_data = image_data.split(';base64,')
        ext = format.split('/')[-1]
        image_name = ''.join(random.choice(letters) for i in range(10))
        signature = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")

        upload = Upload.objects.create(
            file = signature
        )
        img_url = upload.file.url

        data = {
            'petition': request.data['petition'],
            'name': request.data['name'],
            'phone_number': request.data['phone_number'],
            'signature': img_url
        }
        petition = PetitionEntrySerializer(data=data)
        if petition.is_valid():
            petition.save()
            res = {
                'message': "Successful Submission",
                'petition': petition.data
            }
        else:
            res = {
                'message': 'Error',
                "Error": petition.errors
            }
        return Response(res)

class RepresentativeSurveyEntryView(APIView):
    
    def get(self, request):
        existingSurvey = RepresentativeSurveyEntry.objects.filter(user=request.user)
        
        if existingSurvey.exists():
            return Response( data={'existingEntry': True} )
        else:
            return Response( data={'existingEntry': False} )

    def post(self, request):
        data = {
            'user' : request.user,
            **request.data
        }

        surveyEntry = RepresentativeSurveyEntry(**data)
        surveyEntry.save()

        return Response( data={'message': 'You created an entry, congrats!'} )

class CredencialSurveyEntryView(APIView):
    
    def get(self, request):
        existingSurvey = CredencialSurveyEntry.objects.filter(user=request.user)
        
        if existingSurvey.exists():
            return Response( data={'existingEntry': True} )
        else:
            return Response( data={'existingEntry': False} )

    def post(self, request):
        data = {
            'user' : request.user,
            **request.data
        }

        surveyEntry = CredencialSurveyEntry(**data)
        surveyEntry.save()

        return Response( data={'message': 'You created an entry, congrats!'} )

class VotingForAmmonSurveyEntryView(APIView):
    
    def get(self, request):
        existingSurvey = VotingForAmmonSurveyEntry.objects.filter(user=request.user)
        
        if existingSurvey.exists():
            return Response( data={'existingEntry': True} )
        else:
            return Response( data={'existingEntry': False} )

    def post(self, request):
        data = {
            'user' : request.user,
            **request.data
        }

        surveyEntry = VotingForAmmonSurveyEntry(**data)
        surveyEntry.save()

        return Response( data={'message': 'You created an entry, congrats!'} )


class AgreementView(APIView):
    def get(self, request):
        agreements = AgreementSubmission.objects.filter(user=request.user)
        if agreements:
            res = {
                "Agreement": "Submitted"
            }
        else:
            res = {
                "Agreement": "Pending"
            }
        return Response(res)

    def post(self, request):
        agreement = AgreementSubmission.objects.create(
            user = request.user,
            agreement = "Agreement #1"
        )
        res = {
            'Success': 'Success'
        }
        return Response(res)


@api_view(["GET"])
@permission_classes([AllowAny])
def LandingPageView(request):
    
    three_newest_blogs = Blog.objects.filter(status=2, security=2).order_by('-created')[:3]
    
    data = { "blogs" : [] }

    for blog in three_newest_blogs:
        
        data["blogs"].append({
            'id': blog.id,
            'title' : blog.title,
            'summary' : blog.summary
        })
    
    
    return Response(data)


class CurrencyView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        currencyObject = Currency.objects.all().order_by('name')
        try:
            currencies = CurrencySerializer(currencyObject, many=True).data
        except:
            currencies = None
       
        res = {
            "base": "USD",
            "data": datetime.now().strftime("%Y-%m-%d"),
            "rates":currencies
        }

        return Response(res)

class AdminCurrencyView(APIView):
    def put(self, request):
        currency = Currency.objects.get(id=request.data['id'])
        if request.data['name'] != None:
            currency.name = request.data['name']
        if request.data['sell'] != None:
            currency.sell = request.data['sell']
        if request.data['buy'] != None:
            currency.buy = request.data['buy']
        currency.save()
        res = {
            'status':"Success"
        }
        return Response(res)

class DirectoryView(APIView):
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Directory.objects.all().order_by('name')
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name__contains=name)
        return queryset
    
    def get(self, request):
        directoryObj = self.get_queryset()
        try:
            directory = DirectorySerializer(directoryObj, many=True).data
        except:
            directory = None
       
        res = {
            "data":directory
        }

        return Response(res)

class AdminDirectoryView(APIView):
    def delete(self, request):
        Directory.objects.get(id=request.data['id']).delete()
        res = {
            'status': 'Success'
        }
        return Response(res)

    def put(self, request):
        directory = Directory.objects.get(id=request.data['id'])
        if directory.businessPage:
            BP = BusinessPage.objects.get(id=directory.businessPage.id)
        else:
            BP = None
        if request.data["name"] != None:
            directory.name = request.data['name']
        if request.data["latitude"] != None:
            directory.latitude = request.data['latitude']
        if request.data["longitude"] != None:
            directory.longitude = request.data['longitude']
        if request.data["phone_number"] != None:
            directory.phone_number = request.data['phone_number']
        if request.data["category"] != None:
            directory.category = request.data['category']
        if request.data["status"] != None:
            BP.status = request.data['status']
            BP.save()
        directory.save()
        res = {
            'status':"Success",
            'directory': DirectorySerializer(directory).data
        }
        return Response(res)

    def post(self, request):
        directoryObj = DirectorySerializer(data=request.data)
        if directoryObj.is_valid():
            directoryObj.save()
            res = {
            'status':"Success",
            'directory': directoryObj.data
            }
        else:
            res = {
                'status':"Fail",
                "errors": directoryObj.errors
            }
        return Response(res)
    
class BusinessPageAdminView(APIView):
    def post(self, request):
        directoryItem = Directory.objects.get(id=request.data['directoryItem'])
        businessPage = BusinessPage.objects.create(
            name = directoryItem.name,
            phone_number = directoryItem.phone_number,
            latitude = directoryItem.latitude,
            longitude = directoryItem.longitude,
        )
        directoryItem.businessPage = businessPage
        directoryItem.save()
        res = {
            'status': 'Success',
            'pageId': businessPage.id
        }
        return Response(res)
    
    def put(self, request):
        if request.data['type'] == "Map":
            page = BusinessPage.objects.get(id=request.data['page'])
            latitude = request.data['latitude']
            longitude = request.data['longitude']
            page.latitude = latitude
            page.longitude = longitude
            page.save()
            res = {'status': 'Success'}
        if request.data['type'] == "Images":
            page = BusinessPage.objects.get(id=request.data['page'])
            img_count = 0
            
            for obj in request.data["images"]:
                img_count += 1
                image_data = obj['data']
                format, image_data = image_data.split(';base64,')
                ext = format.split('/')[-1]
                image_name = "${}-${}".format(page.name, img_count)
                raw_image = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")
                image = BusinessPagePhoto.objects.create(
                    file = raw_image
                )
                page.photos.add(image)
            res = {'status': 'Success'}
        if request.data['type'] == "Banner":
            page = BusinessPage.objects.get(id=request.data['page'])
            for obj in request.data['image']:
                image_data = obj['data']
                format, image_data = image_data.split(';base64,')
                ext = format.split('/')[-1]
                image_name = "${}-banner".format(page.name)
                raw_image = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")
                image = BusinessPagePhoto.objects.create(
                    file = raw_image
                )
                try:
                    page.banner.delete()
                except: 
                    pass
                page.banner = image
                page.save()
            res = {'status': 'Success'}
        if request.data['type'] == "Info":
            data = request.data
            data.pop('type')
            BusinessPage.objects.filter(id=request.data['id']).update(**data)
            res = {
                'status': 'Success'
            }
        return Response(res)


class BusinessPageView(APIView):
    def get(self, request, slug):
        businessPage = BusinessPage.objects.get(id=slug)
        page = BusinessPageSerializer(businessPage)
        posts = BusinessPagePostSerializer(BusinessPagePost.objects.filter(page=businessPage).order_by('-created_at'), many=True)
        res = {
            "status":"Success",
            "page": page.data,
            "posts": posts.data
        }
        return Response(res)      
    
    def post(self, request):
        res = {
            'status': 'Success'
        }
        return Response(res)

class BusinessPostDetailsView(APIView):
    def get(self, request, slug):
        post = BusinessPagePostSerializer(BusinessPagePost.objects.get(id=slug))
        res = {
            "status":"Success",
            "post": post.data
        }
        return Response(res)   


class CreateCustomerPortalSession(APIView):
    def post(self, request):
        data = request.data
        stripe_customer = StripeCustomer.objects.get(user=request.user)
        session = stripe.billing_portal.Session.create(
            customer=stripe_customer.stripeCustomerId,
            return_url="https://lebarongaleana.com/dashboard"
        )
        return Response({"sessionURL": session.url})

class CreateCheckoutSession(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        try:
            checkout_session = stripe.checkout.Session.create(
                client_reference_id="{}_registration".format(data['userId']),
                success_url="https://lebarongaleana.com/registration/subscriptionSuccess",
                cancel_url="https://lebarongaleana.com/registration/subscription/{}".format(data['userId']),
                payment_method_types=["card"],
                mode="subscription",
                line_items=[
                    {
                        "price": data['priceId'],
                        "quantity": 1
                    }
                ],
                subscription_data={'trial_period_days': 30},
            )
            return Response({'sessionId': checkout_session['id']})
        except Exception as e:
            return Response({'error': {'message': str(e)}}), 400




# Calender Events

class CalendarEventView(APIView):

    def get(self, request):
        events = CalendarEvent.objects.all()
        serializer = CalendarEventSerializer(events, many=True)
        return Response({
            "events": serializer.data
        })

    def post(self, request):
        if request.user.profile.role == 3 or request.user.profile.role == 2:
            
            if request.data['post_type'] == "create":
                data = request.data['event']
                event = CalendarEvent.objects.create(**data)
                return Response({
                    "success": "Created Event"
                }) 
            elif request.data['post_type'] == "edit":
                eventData = request.data['event']
                event = CalendarEvent.objects.filter(id=request.data['id'])
                event.update(**eventData)
                return Response({
                    "success": "Created Event"
                })
            elif request.data['post_type'] == "delete":
                CalendarEvent.objects.get(id=request.data['id']).delete()
                return Response({
                    "success": "Deleted Event"
                })
            else:
                return Response({
                    "success": "Nothing Requested"
                })
        else:
            return Response({
                "Error": "Not Authorized"
            })


class CreateRaffleCheckoutSession(APIView):
    def post(self, request):
        data = request.data
        try:
            stripeCustomer = StripeCustomer.objects.get(user=request.user)
        except:
            stripeCustomer = None

        if stripeCustomer:
            try:
                checkout_session = stripe.checkout.Session.create(
                    client_reference_id="{}_raffle-ticket".format(request.user.id),
                    customer = stripeCustomer.stripeCustomerId,
                    success_url="https://lebarongaleana.com/dashboard/raffle/success",
                    cancel_url="https://lebarongaleana.com/dashboard/raffle",
                    payment_method_types=["card"],
                    mode=data['mode'],
                    line_items=[
                        {
                            "price": data['priceId'],
                            "quantity": 1
                        }
                    ]
                )
                return Response({'sessionId': checkout_session['id']})
            except Exception as e:
                return Response({'error': {'message': str(e)}}), 400
        else:
            try:
                checkout_session = stripe.checkout.Session.create(
                    client_reference_id="{}_raffle-ticket".format(request.user.id),
                    success_url="https://lebarongaleana.com/dashboard/raffle/success",
                    cancel_url="https://lebarongaleana.com/dashboard/raffle",
                    payment_method_types=["card"],
                    mode=data['mode'],
                    line_items=[
                        {
                            "price": data['priceId'],
                            "quantity": 1
                        }
                    ]
                )
                return Response({'sessionId': checkout_session['id']})
            except Exception as e:
                return Response({'error': {'message': str(e)}}), 400






class GroupView(APIView, PageNumberPagination):
    page_size = 10
    max_page_size = 1000

    def get_queryset(self, params):
        try:
            groups = Group.objects.filter(leader__first_name__contains=params['search']).order_by('id')
        except:
            groups = Group.objects.all().order_by('id')
        return self.paginate_queryset(groups, self.request)

    def get(self, request):
        params = request.query_params
        groups = self.get_queryset(params)
        serializer = GroupSerializer(groups, many=True)
        return self.get_paginated_response(serializer.data)
    
    def post(self, request):
        if request.data['post_type'] == 'join_group':
            group = Group.objects.get(id=request.data['groupId'])
            user = request.user
            if group.members.count() < 10:
                group.members.add(user)

                return Response({
                    'success': 'User added to group'
                })
            else:
                return Response({
                    'error': 'Group is full.'
                })

        elif request.data['post_type'] == 'create_group':
            try:
                group = Group.objects.create(
                    leader = request.user,
                    description = request.data['description']
                )
                group.members.add(request.user)

                return Response({
                    'success': "Group Created"
                })
            except Exception as e: 
                return Response({
                    'error': "Couldn't create group."
                })
        else:
            return Response({
                'error': 'Unknown Request'
            })


class MyGroupView(APIView):
    def get(self, request):
        group = Group.objects.get(members=request.user)
        if(group != None):
            groupMessages = GroupMessage.objects.filter(group=group).order_by('-id')
            return Response({
                "success": "User Has Group",
                "groupMessages": GroupMessageSerializer(groupMessages, many=True).data,
                "group": GroupSerializer(group).data
            })
        else:
            return Response({
                "error": "User Doesn't Have Group"
            })
    
    def post(self, request):
        if request.data['post_type'] == "removeUser":
            group = Group.objects.get(id=request.data['group'])
            user = User.objects.get(id=request.data['user'])
            if request.user != group.leader:
                return Response({
                    "error": 'Not authorized to add or remove users.'
                })
            else:
                group.members.remove(user)
                group.save()
                return Response({
                    "success": "User Removed From Group",
                    "group": GroupSerializer(group).data
                })
        elif request.data['post_type'] == "makeLeader":
            group = Group.objects.get(id=request.data['group'])
            user = User.objects.get(id=request.data['user'])
            if request.user != group.leader:
                return Response({
                    "error": 'Not authorized to add or remove users.'
                })
            else:
                group.leader = user
                group.save()
                return Response({
                    "success": "Leader has been changed",
                    "group": GroupSerializer(group).data
                })

        elif request.data['post_type'] == "addUser":
            group = Group.objects.get(id=request.data['group'])
            user = User.objects.get(id=request.data['user'])
            group.members.add(user)
            group.save()

            return Response({
                "success": "User has been added",
                "group": GroupSerializer(group).data
            })

        elif request.data['post_type'] == "leaveGroup":
            group = Group.objects.get(id=request.data['group'])
            user = request.user
            if group.leader == user:
                group.members.remove(user)
                if group.members.count() == 0:
                    group.delete()
                else:
                    group.leader = group.members.all()[0]
                    group.save()
            else:    
                group.members.remove(user)
                group.save()
            return Response({
                "success": "User has left group",
            })
        
        elif request.data['post_type'] == "editDesc":
            group = Group.objects.get(id=request.data['group'])
            user = request.user
            if group.leader == user:
                group.description = request.data['description']
                group.save()
                res = {"success": "desc edit succesful"}
            else:
                res = {"error": "User Not Leader"} 
            return Response(res)
        else:
            return Response({
                "error": 'unknown post_type'
            })
    

class GroupMessageView(APIView):
    def get(self, request, slug):
        group = Group.objects.get(id=slug)
        group_messages = GroupMessage.objects.filter(group=group)
        serializer = GroupMessageSerializer(group_messages, many=True)

        res = {
            "messages": serializer.data
        }
        return Response(res)     

    def post(self, request, slug):
        if request.data['post_type'] == 'delete':
            message = GroupMessage.objects.get(id=request.data['messageId']) 
            group = Group.objects.get(id=slug)
            if request.user == message.creator or request.user == group.leader:
                message.delete()
                groupMessages = GroupMessage.objects.filter(group=slug)
                return Response({
                    "success": "Message deleted.",
                    "groupMessages": GroupMessageSerializer(groupMessages, many=True).data
                })
            else:
                return Response({
                    "error": "User is not authorized to delete message."
                })
        else:
            messageData = request.data["messageData"]
            serializer = GroupCreateMessageSerializer(data=messageData)
            if serializer.is_valid():
                serializer.save()
                groupMessages = GroupMessage.objects.filter(group=slug)
                return Response({
                    "success": "Group Message successfully created",
                    "groupMessages": GroupMessageSerializer(groupMessages, many=True).data
                })
            else: 
                return Response({
                    "error": "Group message not created."
                })
    


class CreateYOICheckoutSession(APIView):
    def post(self, request):
        data = request.data
        try:
            stripeCustomer = StripeCustomer.objects.get(user=request.user)
        except:
            stripeCustomer = None

        if stripeCustomer:
            try:
                children = request.data['children']
                for child in children:
           
                    YOI_Registration.objects.create(
                        first_name = child['first_name'],
                        last_name = child['last_name'],
                        birthdate = child['birthday'],
                        email = child['email'],
                        phone_number = child['phone_number'],
                        allergies = child['allergies'],
                        size = child['size'],
                        parent = request.user,
                        gender = child['gender'],
                        translation_assistance = child['translation_assistance'],
                        spanish_shirt = child['spanish_shirt']
                    )

                checkout_session = stripe.checkout.Session.create(
                    payment_method_types=['card'],
                    customer = stripeCustomer.stripeCustomerId,
                    client_reference_id= "{}_YOI".format(request.user.id),
                    mode='payment',
                    line_items=[{
                        'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'YOI Registration',
                        },
                        'unit_amount': int(request.data['price']),
                        },
                        'quantity': int(request.data['quantity']),
                    }],
                    success_url="https://lebarongaleana.com/dashboard/YOI/register-success",
                    cancel_url="https://lebarongaleana.com/dashboard/YOI/register",
                )
                return Response({'sessionId': checkout_session['id']})
            except Exception as e:
                return Response({'error': {'message': str(e)}}), 400
        else:
            try:
                children = request.data['children']
                for child in children:
                    YOI_Registration.objects.create(
                        first_name = child['first_name'],
                        last_name = child['last_name'],
                        birthdate = child['birthday'],
                        email = child['email'],
                        phone_number = child['phone_number'],
                        allergies = child['allergies'],
                        size = child['size'],
                        parent = request.user,
                        gender = int(child['gender']),
                        translation_assistance = child['translation_assistance'],
                        spanish_shirt = child['spanish_shirt'],
                    )

                checkout_session = stripe.checkout.Session.create(
                    payment_method_types=['card'],
                    client_reference_id= "{}_YOI".format(request.user.id),
                    mode='payment',
                    line_items=[{
                        'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'YOI Registration',
                        },
                        'unit_amount': int(request.data['price']),
                        },
                        'quantity': int(request.data['quantity']),
                    }],
                    success_url="https://lebarongaleana.com/dashboard/YOI/register-success",
                    cancel_url="https://lebarongaleana.com/dashboard/YOI/register",
                )
                return Response({'sessionId': checkout_session['id']})
            except Exception as e:
                return Response({'error': {'message': str(e)}}), 400

class YOI_AssistantView(APIView):
    def post(self, request):
        data = request.data['data']
        data['user']=request.user.id
        form = YOI_AssistantSerializer(data=data)
        if form.is_valid():
            form.save()
            res = {
            'success':"Form successfully submited",
            }
        else:
            res = {
                "errors": form.errors
            }
        return Response(res)


class YOI_RegistrationView(APIView):
    def post(self, request):
        json_data = json.loads(request.body)
        json_data = json_data['data']
        parent, status = create_parent(json_data['parent'])
        if status == "Success":
            child, status = create_child(json_data['child'])
            if status == "Success":
                registration = create_registration(json_data['registration'], request.user, parent, child)
                if registration:
                    registration = RegistrationSerializer(registration).data
                    res = {
                        'message': 'Test Registration Complete',
                        'Registration': registration,
                        'status': 'Success',
                    }
                    return Response(res)
                else:
                    parent.delete()
                    child.delete()
                    res = {
                        'message': 'Error: Problem creating child',
                        'status': 'Error'
                    }
                    return Response(res)
            else:
                parent.delete()
                res = {
                    'message': 'Error: Problem creating child',
                    'status': 'Error'
                }
                return Response(res)
        else:
            res = {
                'message': 'Error: Problem creating parent.',
                'status': 'Error'
            }
            return Response(res)

class YOIAdminView(APIView):
    def get(self, request):
        registrations = YOI_Registration.objects.filter(payment_complete=True)
        serializer = YOI_RegistrationSerializer(registrations, many=True)
        return Response(serializer.data)



class StripeWebhooks(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.body
        event = None

        try:
            event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
            )
        except ValueError as e:
            # Invalid payload
            return Response(status=400)

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            client_reference_id = session.get('client_reference_id').split("_")
            stripe_customer_id = session.get('customer')
            stripe_subscription_id = session.get('subscription')

            if client_reference_id[1] == 'raffle-ticket':
                user = User.objects.get(id=client_reference_id[0])
                if stripe_subscription_id:
                    RaffleEntry.objects.create(
                        user=user,
                        stripeCustomerId=stripe_customer_id,
                        stripeSubscriptionId=stripe_subscription_id,
                    )
                else:
                    RaffleEntry.objects.create(
                        user=user,
                        stripeCustomerId=stripe_customer_id,
                        stripePaymentIntent=session.get('payment_intent'),
                    )
            elif client_reference_id[1] == 'registration':
                user = User.objects.get(id=client_reference_id[0])
                user.profile.subscriptionActive = True
                user.save()
            
                StripeCustomer.objects.create(
                    user=user,
                    stripeCustomerId=stripe_customer_id,
                    stripeSubscriptionId=stripe_subscription_id,
                )
            elif client_reference_id[1] == 'YOI':
                user = User.objects.get(id=client_reference_id[0])
                registrations = YOI_Registration.objects.filter(parent=user, payment_complete=False)
                for child in registrations:
                    child.payment_complete = True
                    child.save()
       
        elif event['type'] == "invoice.payment_succeeded":
            session = event['data']['object']
            customer = session.get('customer')
            subscription = session.get('subscription')
            
            try:
                RaffleTicket = RaffleEntry.objects.get(stripeCustomerId=customer, stripeSubscriptionId=subscription)
            except:
                RaffleTicket = None
   
            if RaffleTicket != None:
                RaffleTicket.payments += 1
                RaffleTicket.save()
                if RaffleTicket.payments >= 10:
                    stripe.Subscription.delete(subscription)
        return Response(status=200)
class MyListingsView(APIView):
    def get(self, request):
        itemsQueryset = Listing.objects.filter(user=request.user).order_by('-id')
        vehiclesQueryset = VehicleListing.objects.filter(user=request.user).order_by('-id')
        listingId = self.request.query_params.get("listingId", None)
        search = self.request.query_params.get("search", None)

        if listingId:
            itemsQueryset = itemsQueryset.filter(id=listingId)
            vehiclesQueryset = vehiclesQueryset.filter(id=listingId)
        if search:
            itemsQueryset = itemsQueryset.filter(title__contains=search)
            vehiclesQueryset = vehiclesQueryset.filter(title__contains=search)
        
        itemsQueryset = ListingSerializer(itemsQueryset, many=True)
        vehiclesQueryset = VehicleListingSerializer(vehiclesQueryset, many=True)

        return Response({
            "items": itemsQueryset.data,
            "vehicles": vehiclesQueryset.data,
        })

    def put(self, request):
        type = request.data['type']
        if type == 'vehicle':
            listing = VehicleListing.objects.get(id=request.data['listingId'])
        elif type == 'classified':
            listing = Listing.objects.get(id=request.data['listingId'])
        if request.user != listing.user:
            return Response({
                "error": "Not The Owner Of This Listing"
            })
        listingData = request.data['listingData']
        listingData['expire_date'] = datetime.now() + timedelta(days=183)
        if type == 'vehicle':
            serializer = VehicleListingSerializer(listing, data={**listingData}, partial=True)
        elif type == 'classified':
            serializer = ListingSerializer(listing, data={**listingData}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": "Listing Updated",
                "response":  serializer.data
            })
        else:
            return Response({
                "error": "Listing Not Updated"
            })

class ListingsView(APIView, PageNumberPagination):
    page_size = 24
    max_page_size = 1000

    def get_queryset(self):
        queryset = Listing.objects.filter(available=True).order_by('-id')
        itemId = self.request.query_params.get("itemId", None)
        categories = self.request.query_params.get("categories", None)
        search = self.request.query_params.get("search", None)

        if search:
            queryset = queryset.filter(title__contains=search)
        elif itemId:
            queryset = queryset.filter(id=itemId)
        elif categories:
            categories = [int(x) for x in categories.split(',')]
            queryset = queryset.filter(category__in=categories)
        else:
            now = datetime.now()
            queryset = queryset.filter(expire_date__gt=now)
        return self.paginate_queryset(queryset, self.request)
    
    def get(self, request):
        objs = self.get_queryset()
        serializer = ListingSerializer(objs, many=True)
        return self.get_paginated_response(serializer.data)
    
    def post(self, request):
        listingData = request.data['listingData']
        listingData['user'] = (request.user.id)
        listingData['expire_date'] = datetime.now() + timedelta(days=183)
        listingObj = ListingSerializer(data=listingData)
        if listingObj.is_valid():
            listingObj.save()
            return Response({
                "success": "Listing Created",
                "listing": listingObj.data
            })
        else:
            return Response({
                    "error": "Listing Not Created"
                })
    
    def put(self, request):
        listing = Listing.objects.get(id=request.data['listing'])
        if request.user != listing.user:
            return Response({
                "error": "Not The Owner Of This Listing"
            })
        listingData = request.data['listingData']
        serializer = ListingSerializer(listing, data={**listingData}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": "Listing Updated",
                "listing":  serializer.data
            })
        else:
            return Response({
                "error": "Listing Not Updated"
            })
    
    def delete(self, request):
        try:
            listing = Listing.objects.get(id=request.data['listing'])
            if request.user == listing.user:
                listing.delete()
                return Response({
                    "success": "Listing Deleted",
                })
            else:
                return Response({
                    "error": "Not The Owner Of This Listing"
                })
        except:
            return Response({
                "error": "Listing Not Found"
            })

class VehicleListingsView(APIView, PageNumberPagination):
    page_size = 24
    max_page_size = 1000

    def get_queryset(self):
        queryset = VehicleListing.objects.filter(available=True).order_by('-id')
        vehicleId = self.request.query_params.get("vehicleId", None)
        search = self.request.query_params.get("search", None)
        
        if vehicleId:
            queryset = queryset.filter(id=vehicleId)
        elif search:
            queryset = queryset.filter(title__contains=search)
        else:
            now = datetime.now()
            queryset = queryset.filter(expire_date__gt=now)
        return self.paginate_queryset(queryset, self.request)

    def get(self, request):
        objs = self.get_queryset()
        serializer = VehicleListingSerializer(objs, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        listingData = request.data['listingData']
        listingData['user'] = (request.user.id)
        listingData['expire_date'] = datetime.now() + timedelta(days=183)
        listingObj = VehicleListingSerializer(data=listingData)
        if listingObj.is_valid():
            listingObj.save()
            return Response({
                "success": "Listing Created",
                "listing": listingObj.data
            })
        else:
            return Response({
                "error": "Listing Not Created"
            })
    
    def put(self, request):
        listing = VehicleListing.objects.get(id=request.data['listing'])
        if request.user != listing.user:
            return Response({
                "error": "Not The Owner Of This Listing"
            })
        listingData = request.data['listingData']
        serializer = VehicleListingSerializer(listing, data={**listingData}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": "Listing Updated",
                "listing":  serializer.data
            })
        else:
            return Response({
                "error": "Listing Not Updated"
            })

    def delete(self, request):
        try:
            listing = VehicleListing.objects.get(id=request.data['listing'])
            if request.user == listing.user:
                listing.delete()
                return Response({
                    "success": "Listing Deleted",
                })
            else:
                return Response({
                    "error": "Not The Owner Of This Listing"
                })
        except:
            return Response({
                "error": "Listing Not Found"
            })


class ListingImageUpload(APIView):

    def post(self, request):
        images = request.data['images']
        listingId = request.data['listingId']
        listingType = request.data['type']
        if listingType == "classified":
            listing = Listing.objects.get(id=listingId)
        else:
            listing = VehicleListing.objects.get(id=listingId)

        listing.available = False
        listing.save()

        for image in images:
            image_data = image["data"]
            image_name = image["name"].split(".")[0] + "_{}_listing_image".format(request.user.username)
            format, image_data = image_data.split(';base64,')
            imageFile = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")

            listing_image = ListingImage.objects.create(
                file = imageFile
            )

            listing.photos.add(listing_image)
            listing.save()

        listing.available = True
        listing.save()
 
        return Response({
            "success": "images saved"
        })

    def delete(self, request):
        imageId = request.data['imageId']
        ListingImage.objects.get(id=imageId).delete()
        return Response({
            "success": "image deleted"
        })

class ClassifiedFavorites(APIView):
    
    def get(self, request):
        classifiedFavorites = ClassifiedFavorite.objects.filter(user=request.user).order_by('-id')
        vehicleId = self.request.query_params.get("vehicleId", None)
        listingId = self.request.query_params.get("listingId", None)

        if vehicleId:
            classifiedFavorites = classifiedFavorites.filter(vehicle_listing=vehicleId)
        if listingId:
            classifiedFavorites = classifiedFavorites.filter(listing=listingId)

        serializer = ClassifiedFavoriteSerializer(classifiedFavorites, many=True)

        return Response({
            "classified_favorites": serializer.data,
        })

    def post(self, request):
        vehicleId = request.data['vehicleId']
        listingId = request.data['listingId']
        vehicle_listing = None
        listing = None
        if vehicleId:
            vehicle_listing = VehicleListing.objects.get(id=vehicleId)
        if listingId:
            listing = Listing.objects.get(id=listingId)

        ClassifiedFavorite.objects.create(
            user=request.user,
            vehicle_listing=vehicle_listing,
            listing=listing,
        )

        return Response({
            "success": "Classified Favorite Created"
        })

    def delete(self, request):
        classifiedFavorite = ClassifiedFavorite.objects.filter(user=request.user)
        vehicleId = self.request.query_params.get("vehicleId", None)
        listingId = self.request.query_params.get("listingId", None)

        try:
            if vehicleId:
                classifiedFavorite = classifiedFavorite.filter(vehicle_listing=vehicleId).delete()
            if listingId:
                classifiedFavorite = classifiedFavorite.filter(listing=listingId).delete()

            return Response({
                "success": "Classified Favorite Deleted"
            })
        except:
            return Response({
                "error": "Classified Favorite Not Found"
            })  

class RaffleView(APIView):
    def get(self, request):
        tickets = RaffleEntry.objects.filter(user=request.user)
        serializer = RaffleEntrySerializer(tickets, many=True)
        return Response({
            "tickets": serializer.data
        })


@api_view(["POST",])
@permission_classes([AllowAny])
def MailSenderView(request):

    username = request.data['username']
    email = request.data['email']
    message = request.data['message']

    UM = "From - " + username + ' | message = ' + message
    send_mail('I have A Question', UM, email, ['LebaronGaleanaOfficial@gmail.com'], fail_silently=False)

    return Response()
