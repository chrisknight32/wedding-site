from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'wedding_site.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', include('home.urls')),
    url(r'^wedding/', include('home.urls')),
    url(r'^rsvp/', include('rsvp.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
