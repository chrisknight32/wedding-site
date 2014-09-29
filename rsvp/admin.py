from django.contrib import admin
from rsvp.models import Person,Invite,Response

class PersonInline(admin.TabularInline):
    model = Person
    extra = 1

class InviteAdmin(admin.ModelAdmin):
    inlines = [PersonInline]
    list_display = ('inviteId', 'first_person')

class ResponseAdmin(admin.ModelAdmin):
    list_display = ('person', 'going', 'reply_time')
    list_filter = ['person']

# Register your models here.
admin.site.register(Person)
admin.site.register(Invite, InviteAdmin)
admin.site.register(Response, ResponseAdmin)

