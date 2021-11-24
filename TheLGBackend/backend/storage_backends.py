from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings

class SignatureStorage(S3Boto3Storage):
    location = 'signatures'
    default_acl = 'public-read'
    file_overwrite = True

class ThumbnailStorage(S3Boto3Storage):
    location = 'BlogThumbnails'
    default_acl = 'public-read'
    file_overwrite = True

class BusinessPagePhotoStorage(S3Boto3Storage):
    location = "BusinessPagePhotos"
    default_acl = 'public-read'
    file_overwrite = False

class ListingImageStorage(S3Boto3Storage):
    location = "ListingImages"
    default_acl = 'public-read'
    file_overwrite = False

class ProfileImageStorage(S3Boto3Storage):
    location = "ProfileImages"
    default_acl = 'public-read'
    file_overwrite = False