from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from .models import *
from .choices.listings import *

class ProfileSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source='get_status_display')
    role = serializers.CharField(source='get_role_display')

    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'email', 'profile', 'date_joined')

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        profile = validated_data.get('profile')
        instance.profile.role = profile.get('role')
        instance.profile.status = profile.get('status')
        
        instance.save()
        return instance


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password']

    def validate(self, data):
        if data['email'] == '':
            raise serializers.ValidationError({"error":"This field may not be blank"})
        else:
            return data

    def save(self):
            user = User(
                email = self.validated_data['email'],
                username=self.validated_data['username'],
                first_name=self.validated_data['first_name'],
                last_name=self.validated_data['last_name']
            )
            user.set_password(self.validated_data['password'])
            user.save()
            return user
         

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields =['id', 'name', 'price']


class PostSerializer(serializers.ModelSerializer):
    items = ItemSerializer(read_only=True, many=True)
    class Meta:
        model = Post
        fields = ['id', 'post_type', 'title', 'content', 'items', 'contact', 'submittedOn', 'imageURL']

class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        return self._choices[obj]


    def to_internal_value(self, data):
        # To support inserts with the value
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)

class BlogPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"
        
class BlogSerializer(serializers.ModelSerializer):
    status = ChoiceField(choices=Blog.STATUS_CHOICES)
    security = ChoiceField(choices=Blog.SECURITY_CHOICES)
    createdBy = UserSerializer()
    lastUpdatedBy = UserSerializer()

    class Meta:
        model = Blog
        fields = [
            'id', 'createdBy', 'lastUpdatedBy', 'created', 'updated',
            'title', 'summary', 'thumb_nail', 'content', 'status',
            'security'
            ]
            
class PetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Petition
        fields = "__all__"
    
class PetitionEntrySerializer(serializers.ModelSerializer):
    # petition = PetitionSerializer()

    class Meta:
        model = PetitionEntry
        fields = ['id', 'date', 'name', 'phone_number', 'signature', 'petition']

class PetitionEntryGETSerializer(serializers.ModelSerializer):
    petition = PetitionSerializer()

    class Meta:
        model = PetitionEntry
        fields = ['id', 'date', 'name', 'phone_number', 'signature', 'petition']

class AgreementSubmissionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = AgreementSubmission
        fields = "__all__"


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id', 'name', 'buy', 'sell']
    



class BusinessPagePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessPagePhoto
        fields = "__all__"


class BusinessPageSerializer(serializers.ModelSerializer):
    banner = BusinessPagePhotoSerializer(read_only=True)
    photos = BusinessPagePhotoSerializer(read_only=True, many=True)
    status = serializers.CharField(source='get_status_display')

    class Meta:
        model = BusinessPage
        fields = "__all__"


class BusinessPagePostSerializer(serializers.ModelSerializer):
    page = BusinessPageSerializer()
    
    class Meta:
        model = BusinessPagePost
        fields = "__all__"

class DirectorySerializer(serializers.ModelSerializer):
    businessPage = BusinessPageSerializer(read_only=True)

    class Meta:
        model = Directory
        fields = "__all__"

class StripeCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StripeCustomer
        fields = "__all__"

class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = "__all__"

class YOI_AssistantSerializer(serializers.ModelSerializer):
    class Meta:
        model = YOI_Assistant
        fields = "__all__"

class YOI_RegistrationSerializer(serializers.ModelSerializer):
    parent = UserSerializer()
    class Meta:
        model = YOI_Registration
        fields = "__all__"

class GroupSerializer(serializers.ModelSerializer):
    leader = UserSerializer()
    members = UserSerializer(many=True)
    class Meta:
        model = Group
        fields = "__all__"

class GroupCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"

class GroupMessageSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    class Meta:
        model = GroupMessage
        fields = "__all__"

class GroupCreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMessage
        fields = "__all__"

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = "__all__"
    
class ListingSerializer(serializers.ModelSerializer):
    photos = ListingImageSerializer(read_only=True, many=True)
    
    class Meta:
        model = Listing
        fields = "__all__"

class VehicleListingSerializer(serializers.ModelSerializer):
    photos = ListingImageSerializer(read_only=True, many=True)
 
    class Meta:
        model = VehicleListing
        fields = "__all__"

class ClassifiedFavoriteSerializer(serializers.ModelSerializer):
    vehicle_listing = VehicleListingSerializer()
    listing = ListingSerializer()

    class Meta:
        model = ClassifiedFavorite
        fields = "__all__"

class RaffleEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = RaffleEntry
        fields = "__all__"