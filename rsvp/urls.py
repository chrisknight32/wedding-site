from django.conf.urls import patterns, url
from rsvp import views

urlpatterns = patterns('',
        url(r'^(?P<invite_id>\d+)/$', views.respond, name='respond')
)
