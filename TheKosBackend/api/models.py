from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from backend.storage_backends import ImageStorage


from datetime import timedelta
import django.utils.timezone as timezone

class Upload(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(storage=ImageStorage())

# Create Token When New User Created
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class ForgotPasswordToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    token = models.TextField(unique=True)
    
    def get_token(self):
        return self.token
    
    def get_user(self):
        return self.user
    
    def is_expired(self):
        
        expiration_limit = timedelta(minutes=30)
        
        # using timezone.now() because django's auto_now_add uses it
        # time.time() or anything else create a 4 hour time difference
        return ( timezone.now() - self.created > expiration_limit )


# Profile Model That Extends User Model
class Profile(models.Model):
    GENDER_CHOICES = (
        ('M', 'MALE'),
        ('F', 'FEMALE'),
        ('O', 'OTHER'),
    )
    ROLES = (
        ("ADMIN", "Admin"),
        ("USER", "User"),
    )
    SIZES = (
        ('SMALL', 'Small'),
        ('MEDIUM', 'Medium'),
        ('LARGE', 'Large'),
        ('EXTRA-LARGE', 'Extra-Large')
    )
    LANGUAGE = (
        ('ENGLISH', 'English'),
        ('SPANISH', 'Spanish')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    email_confirmed = models.BooleanField(default=False)
    roles = models.CharField(max_length=5, choices=ROLES, default="USER")
    shirt_size = models.CharField(max_length=20, choices=SIZES, default="LARGE")
    language = models.CharField(max_length=20, choices=LANGUAGE, default="ENGLISH")
    registration = models.BooleanField(default="False")
    registrationSubmission = models.ManyToManyField(Upload, blank=True, null=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()



class CheckIn(models.Model):
    WORKOUTS = (
        ('WEIGHTS', 'Weights'),
        ('CARDIO', 'Cardio'),
        ('SWIMMING', 'Swimming'),
        ('RUNNING', 'Running'),
        ('CYCLING', 'Cycling'),
        ('SPORTS', 'Sports'),
        ('SOCCER', 'Soccer'),
        ('VOLLEYBALL', 'Volleyball'),
        ('GOLF', 'Golf'),
        ('HUNTING', 'Hunting'),
        ('HIKING', 'Hiking'),
        ('HIIT', 'HIIT'),
        ('CALISTHENICS', 'Calisthenics'),
        ('YOGA', 'Yoga'),
        ('CROSSFIT', 'Crossfit'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    workoutLength = models.TimeField()
    workoutType = models.CharField(max_length=100, choices=WORKOUTS)
    picture = models.URLField(blank=True, null=True)


class Challenge(models.Model):
    REPEAT_OPTIONS = (
        ('Never', 'Never'),
        ('Weekly', 'Weekly'),
        ('Bi-Weekly', 'Bi-Weekly'),
        ('Bi-Monthly', 'Bi-Monthly'),
        ('Monthly', 'Monthly')
    )
    RES_OPTIONS = (
        ("Time", "Time"),
        ("Amount", "Amount")
    )
    title = models.CharField(max_length=100)
    summary = models.TextField()
    repeat = models.CharField(max_length=10, choices=REPEAT_OPTIONS, default="Never")
    response = models.CharField(max_length=10, choices=RES_OPTIONS, default="Amount")
    deadline =models.DateTimeField()

    def __str__(self):
        return self.title


class ChallengeSubmission(models.Model):
    user =  models.ForeignKey(User, on_delete=None)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, null=True, related_name="challenge")
    time = models.TimeField(blank=True, null=True)
    amount = models.DecimalField(blank=True, null=True, max_digits=20, decimal_places=5)
    details = models.TextField(blank=True, null=True)



class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    challenges = models.ManyToManyField(Challenge)
    summary = models.TextField()
    video = models.URLField(blank=True, null=True)
    images = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title