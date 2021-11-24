import stripe
from rest_framework.authtoken.models import Token
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.contrib.auth.models import User

from .models import ForgotPasswordToken, ChallengeSubmission, Upload

from datetime import timedelta
from timeloop import Timeloop

timeloop = Timeloop()

from django.core.files.base import ContentFile
import random
import string
import base64
from django.utils.crypto import get_random_string

stripe.api_key = 'sk_test_51GrtUoHuoQnP408hRCNMQHsnv6xGhKddTNKoSlpC3apsOarcLs23GnYmrqregvBNVaU7bU1SJuw8BRuFhRuX4f1U001f9qGXda'
sendgrid_api_key = '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'

def create_stripe_payment(amount):    
    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency='usd',
        metadata={'integration_check': 'accept_a_payment'},
    )
    return intent

def send_confirmation_email(user):
    user_token = Token.objects.get(user=user)
    domain = 'http://localhost:3000/confirmation/{}'.format(user_token)
    message = Mail(
        from_email='KOSfitness@gmail.com',
        to_emails=user.email,
        subject='Activate Your KOS Account',
        html_content='<strong>Click The Link To Activate Your Account</strong><p>{}</p>'.format(domain))
    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
    except Exception as e:
        response = e.message
    return response


def send_forgot_password_email(email_address):
    sg = SendGridAPIClient(sendgrid_api_key)

    no_account_template_id = "d-0ef87dab39e4413c8c7d7790ed2da7df"

    account_found_template_id = "d-50f2d200d55742a7882d5506e3159d17"


    data = {
        "personalizations" : [
            {
                "to" : [
                    { 
                    "email" : email_address
                    }
                ]
            },
        ],
        "from" : {
            "email" : 'KOSfitnessOfficial@gmail.com'
        }
    }


    # find user 
    try:
        user = User.objects.get( email=email_address )

        name = user.get_full_name()

        token = generate_forgot_password_token(user)

        template_id = account_found_template_id

        data["personalizations"][0]["dynamic_template_data"] = {
            "name" : name,
            "link" : "https://localhost:3000/forgot-password/{}".format(token)
        }

    except User.DoesNotExist:
        template_id = no_account_template_id

        data["personalizations"][0]["dynamic_template_data"] = {
            "email" : email_address
        }

    data["template_id"] = template_id

    # send email
    try:
        response = sg.client.mail.send.post(request_body=data)
    except Exception as e:
        return

def generate_forgot_password_token(user):
    
    token = ForgotPasswordToken(user=user, token=get_random_string(42, allowed_chars=string.ascii_lowercase + string.digits))

    token.save()
    
    return token.get_token()

def reset_password(token, password):
     
    try:
        token = ForgotPasswordToken.objects.get(token=token)
        
        if token.is_expired():
            token.delete()
            return 'token not found'
        
        user = token.get_user()
        
        token.delete()
        
        user.set_password(password)
        
        user.save()
        
        return 'success'
    except ForgotPasswordToken.DoesNotExist:
        return 'token not found'

@timeloop.job(interval=timedelta(minutes=60))
def check_for_expired_tokens():
    queryset = ForgotPasswordToken.objects.all()
    for item in queryset:
        if item.is_expired():
            item.delete()


def get_user_challenge_submissions(user):
    
    submissions = ChallengeSubmission.objects.filter(user=user).order_by('-id')
    
    title_value_list = []
    
    for submission in submissions:
        submissionObject = {}
        
        # print('======')
        # print(challenge.challenge.title)
        submissionObject['title'] = submission.challenge.title
        submissionObject['id'] = submission.id
        
        if submission.amount is not None:
            # print(challenge.amount)
            submissionObject['value'] = submission.amount
        elif submission.time is not None:
            # print(challenge.time)
            submissionObject['value'] = submission.time
        
        title_value_list.append(submissionObject)

    # print(title_value_list)

    return title_value_list


# not really sure where to put this, but this is necessary to start the timeloop
timeloop.start()
# There was some other boiler plate code for killing the process,
# but it kept causing problems.
# This by itself works. 

def ImageUpload(image):
    letters = string.ascii_lowercase
    format, image_data = image.split(';base64,')
    image_name = ''.join(random.choice(letters) for i in range(10))
    picture = ContentFile(base64.b64decode(image), name=image_name + ".jpeg")
    upload = Upload.objects.create(
            file = picture
        )
    img = upload

    return img