from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('upload/', views.upload_file, name='upload_file'),
    # path('some-other-endpoint/', views.some_other_view, name='some_other_view'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
