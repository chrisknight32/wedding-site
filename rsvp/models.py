from django.db import models
from random import randint

# Create your models here.
class Invite(models.Model):
    inviteId = models.PositiveIntegerField(unique=True)

    def first_person(self):
        return self.people.first()

    def __unicode__(self):
        return unicode(self.inviteId)

class Person(models.Model):
    invite = models.ForeignKey(Invite, related_name='people')
    first_name = models.CharField("person's first name", max_length=50)
    last_name = models.CharField("person's last name", max_length=50)

    def most_recent_response(self):
        return self.responses.order_by('reply_time').first().going

    def __unicode__(self):
        return self.first_name + " " + self.last_name

    class Meta:
        verbose_name_plural = "people"

class Response(models.Model):
    person = models.ForeignKey(Person, related_name='responses')
    going = models.BooleanField()
    comment = models.TextField(blank=True);
    reply_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        if self.going:
            return unicode(self.person) + ": Yes"
        else:
            return unicode(self.person) + ": No"
