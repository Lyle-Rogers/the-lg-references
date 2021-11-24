from django.contrib.auth.models import User
from .serializers import *
from .utils import (create_stripe_payment, send_confirmation_email,
    send_forgot_password_email, reset_password, get_user_challenge_submissions,
    ImageUpload)
from .models import Upload, CheckIn, Challenge, ChallengeSubmission

# from django.core.mail import EmailMessage
# from django.contrib.sites.shortcuts import get_current_site
# from django.template.loader import render_to_string

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from django.core.files.base import ContentFile
import random
import string
import base64
import datetime

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token


class DashboardView(APIView):
    def post(self, request):
        time = request.data['time']
        if request.data['amount'] is not None:
            challengeAttempt = ChallengeSubmission.objects.create(
                user =  request.user,
                challenge = Challenge.objects.get(id=request.data['challenge']),
                amount = request.data['amount'],
            )  
            res = {
                'Success': True,
                'message': 'Successfully added challenge attempt.'
            }   
        elif all(time[v] is None for v in time):
            res = {
                'Success': False,
                'Error': "Incomplete"
            }
        else:
            seconds = 0
            for i in time:
                if time[i] is not None:
                    if i == 'hours':
                        seconds += time[i] * 3600
                    elif i == 'minutes':
                        seconds += time[i] * 60
                    else:
                        seconds += time[i]   
            challengeAttempt = ChallengeSubmission.objects.create(
                user =  request.user,
                challenge = Challenge.objects.get(id=request.data['challenge']),
                time = str(datetime.timedelta(seconds=seconds)),
            )                 
            res = {
                'Success': True,
                'message': 'Successfully added challenge attempt.'
            }           
        return Response(res)

        
    def get(self, request):
        challengeSubmissions = ChallengeSubmission.objects.filter(user=request.user)
        excludeId = []
        for sub in challengeSubmissions:
            excludeId.append(sub.challenge.id)
        challenges = Challenge.objects.exclude(id__in=excludeId)
        
        response = {
            "challenges": ChallengeSerializer(challenges, many=True).data,
            "message": "Hello from dashboard",
        }
        return Response(response)


class GetUserView(APIView):
    def get(self, request):
        user = UserSerializer(request.user)
        data = {
            'message': 'get request recieved from getuserview',
            'user': user.data
        }
        return Response(data)
    def post(self, request):
        user = request.user
        user.profile.email_confirmed = True
        user.save()
        user = UserSerializer(request.user)
        data = {
            'message': 'get request recieved from getuserview',
            'user': user.data
        }
        return Response(data)

class UpdateUserView(APIView):
    def put(self, request):
        user = request.user
        if request.data['PUT_TYPE'] == 'Payment':
            if request.data['PAYMENT_TYPE'] == 'Card':
                user.profile.registration = request.data['registration']
                user.save()
            elif request.data['PAYMENT_TYPE'] == 'Other':
                image_data = request.data['imgData']
                img = ImageUpload(image_data)
                user.profile.registration = request.data['registration']
                user.profile.registrationSubmission.add(img)
                user.save()
            else:
                pass
        else:
            if user.profile.height != request.data['height']:
                user.profile.height = request.data['height']
            if user.profile.weight != request.data['weight']:
                user.profile.weight = request.data['weight']
            if user.profile.shirt_size != request.data['shirt_size']:
                user.profile.shirt_size = request.data['shirt_size']
                
            user.save()
        data = {
            'message': 'User Successfully Updated'
        }
        return Response(data)
        


@api_view(["POST","GET"])
@permission_classes([AllowAny])
def SignUpView(request):
    if request.method == "POST":
        userInfo = request.data
        data = {}
        user = User.objects.create_user(
            username = userInfo['username'],
            email = userInfo['email'],
            password = userInfo['password'],
        )
        user.save()
        
        user.first_name = userInfo['first_name']
        user.last_name = userInfo['last_name']
        height = (int(userInfo['height_ft']) * 12) + int(userInfo['height_in'])
        user.profile.age = userInfo['age']
        user.profile.height = height
        user.profile.gender = userInfo['gender']
        user.profile.weight = userInfo['weight']
        
        try:
            device = userInfo['device']
        except:
            device = None
        if device and device == "mobile":
            user.profile.registration = False
        else:
            user.profile.registration = True
            
        user.save()
        token = Token.objects.get(user=user)
        send_confirmation_email(user)

        user = User.objects.get(id=user.id)
        user = UserSerializer(user)
        
        data['response'] = "successfully registered a new user."
        data['signedIn'] = True
        data['token'] = token.key
        data['user'] = user.data
   
        return Response(data)
    else:
        res = {
            "message": "GET isn't allowed"
        }

        return Response(res)


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


class Test(APIView):
    def get(self, request):
        send_confirmation_email(request.user)
        return Response({'message':'Test Hit'})

class Stripe(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        price = request.query_params.get('price')
        if price:
            intent = create_stripe_payment(price)
        else:
            intent = create_stripe_payment(20600)
        client_secret=intent.client_secret
        return Response(client_secret)


class Admin(APIView):

    def get(self, request):
        users = User.objects.all().order_by('-profile__registration')
        users = UserSerializer(users, many=True)
        res = {
            'users':users.data,
        }
        return Response(res)

class CheckInDetails(APIView):

    def get(self, request):
        checkIns = CheckInGetSerializer(CheckIn.objects.all(), many=True)
        res = {
            'checkIns': checkIns.data
        }
        return Response(res)


class CheckInView(APIView):

    def get(self, request):
        firstDate = request.query_params.get('dateOne')
        secondDate = request.query_params.get('dateTwo')
        try:
            order = request.query_params.get('order')
        except:
            order = None

        checkIn = CheckIn.objects.filter(user=request.user)
        totalCheckIns = checkIn.count()
        
        checkIn = checkIn.filter(date__range=[firstDate, secondDate])
        if order and order == "newest":
            checkIn = checkIn.order_by('-id')
        checkIn = CheckInSerializer(checkIn, many=True)
        res = {
            'message': 'GET request hit',
            'checkIn': checkIn.data,
            "totalCount": totalCheckIns,
        }
        return Response(res)

    def post(self, request):
        letters = string.ascii_lowercase
        image_data = request.data['imgData']
        letters = string.ascii_lowercase
        image_name = ''.join(random.choice(letters) for i in range(10))
        
        try: 
            format, image_data = image_data.split(';base64,')
        except:
            pass

        picture = ContentFile(base64.b64decode(image_data), name=image_name + ".jpeg")

        upload = Upload.objects.create(
            file = picture
        )

        img_url = upload.file.url

        data = {
            "user": request.user.id,
            "date": request.data['date'],
            "workoutLength": request.data['workoutDuration'],
            "workoutType": request.data['workoutType'],
            "picture": img_url
        }

        checkIn = CheckInSerializer(data=data)

        if checkIn.is_valid():
            checkIn.save()
            res = {
                'messages': 'CheckIn Successfully Created',
                'checkIn': checkIn.data
            }
        else:
            res = {
                'messages': 'CheckIn Unsuccessful',
                'Errors': checkIn.errors
            }
        return Response(res)

class ChallengeAdmin(APIView):
    def post(self, request):
        if request.data['type'] == "Edit":
            challengeData = request.data['challenge']
            challenge = Challenge.objects.get(id=challengeData['id'])
            challenge.title = challengeData['title']
            challenge.summary = challengeData['summary']
            challenge.response = challengeData['response']
            challenge.deadline = request.data['deadline']
            challenge.save()
            res = {
                'Success': "Challenge Successfully Updated"
            }
        if request.data['type'] == "Delete":
            challengeData = request.data['challenge']
            challenge = Challenge.objects.filter(id=challengeData['id'])
            challenge.delete()
            res = {
                'Success': "Challenge Successfully Deleted"
            }
        if request.data['type'] == 'Create':
            challengeData = request.data['challenge']
            try:
                repeat = challengeData['repeat']
            except:
                repeat = "Never"

            try:
                response = challengeData['response']
            except:
                response = "Amount"

            Challenge.objects.create(
                title = challengeData['title'],
                summary = challengeData['summary'],
                repeat = repeat,
                response = response,
                deadline = request.data['deadline']
            )
            res = {
                "Success": "Challenge Created"
            }
        return Response(res)
    def get(self, request):
        challenges = Challenge.objects.all()
        response = {
            "challenges": ChallengeSerializer(challenges, many=True).data,
        }
        return Response(response)


class ChallengeSubmissionAdmin(APIView):
    def get(self, request):
        challengeSubmissions = ChallengeSubmission.objects.all().order_by('challenge')

        
        response = {
            "challenges": ChallengeSubmissionSerializer(challengeSubmissions, many=True).data,
        }
        return Response(response)

@api_view(['GET'])
def UserChallengeSubmissions(request):
     
    title_value_list = get_user_challenge_submissions(request.user)
    
    return Response(title_value_list)

# class ActivityView(APIView):
#     def get(self, request):
#         firstDate = request.query_params.get('dateOne')
#         secondDate = request.query_params.get('dateTwo')

#         checkIn = CheckIn.objects.filter(user=request.user, date__range=[firstDate, secondDate])
#         checkIn = CheckInSerializer(checkIn, many=True)
#         res = {
#             'message': 'GET request hit',
#             'checkIn': checkIn.data,
#         }
#         return Response(res)